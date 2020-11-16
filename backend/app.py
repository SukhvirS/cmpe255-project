from  flask import Flask, escape, request
from  flask_cors import CORS, cross_origin
import json
import pickle
import numpy as np
import pandas as pd
import tensorflow as tf

app = Flask(__name__)
CORS(app)

# linear model
linear_model = None
with open('./models/linear_model.pkl','rb') as f:
    linear_model = pickle.load(f)
print(linear_model)


# xgboost model
xgb_model = None
with open('./models/xgb_model.pkl','rb') as f:
    xgb_model = pickle.load(f)
print(xgb_model)


# neural network model
nn_model = tf.keras.models.load_model('./models/nn_model')
print(nn_model)


# standard scaler
sc = None
with open('./models/standard_scaler.pkl','rb') as f:
    sc = pickle.load(f)
print(sc)

@app.route('/')
def index():
    return 'hello'

@app.route('/getPrediction', methods=['POST'])
def getPrediction():
    data = json.loads(request.data)
    pred = getPredictionFromModel(data)
    pred = pred[0]
    result = {
        'prediction': pred
    }
    return result

def getPredictionFromModel(data):
    global linear_model
    global xgb_model
    global nn_model
    global sc

    bedrooms = float(data['bedrooms'])
    bathrooms = float(data['bathrooms'])
    sqft = float(data['sqft'])
    lat = float(data['latitude'])
    lon = float(data['longitude'])
    stories = float(data['stories'])
    rooms = float(data['rooms'])
    year_built = int(data['yearBuilt'])
    land_tax = 280000

    model_request = data['model']
    model = None
    model_output = None

    if model_request == 'linear':
        model = linear_model
        model_input = np.array([[bathrooms, bedrooms, sqft, lat, lon, stories, rooms, year_built, land_tax]])
        model_input = sc.transform(model_input)
        model_output = model.predict(model_input)

    elif model_request == 'xgboost':
        model = xgb_model
        cols = xgb_model.get_booster().feature_names
        d = {
            'calculatedfinishedsquarefeet':[sqft],
            'latitude':[lat],
            'numberofstories':[stories],
            'longitude':[lon],
            'roomcnt':[rooms],
            'bedroomcnt':[bedrooms],
            'yearbuilt':[year_built],
            'landtaxvaluedollarcnt':[land_tax],
            'bathroomcnt':[bathrooms]
        }
        df = pd.DataFrame(data=d)
        df = df[cols]
        normalized_data = sc.transform(df)
        df = pd.DataFrame(normalized_data, columns=cols)
        model_input = df
        model_output = model.predict(model_input)
        model_output = model_output.astype('float64')

    elif model_request == 'neural':
        model = nn_model
        cols = ['bathroomcnt','bedroomcnt','calculatedfinishedsquarefeet','latitude','longitude','numberofstories','roomcnt','yearbuilt','landtaxvaluedollarcnt']
        d = {
            'bathroomcnt':[bathrooms],
            'bedroomcnt':[bedrooms],
            'calculatedfinishedsquarefeet':[sqft],
            'latitude':[lat],
            'longitude':[lon],
            'numberofstories':[stories],
            'roomcnt':[rooms],
            'yearbuilt':[year_built],
            'landtaxvaluedollarcnt':[land_tax],
        }
        df = pd.DataFrame(data=d)
        df = df[cols]
        normalized_data = sc.transform(df)
        df = pd.DataFrame(normalized_data, columns=cols)
        model_input = df
        model_output = model.predict(model_input)[0]
        model_output = model_output.astype('float64')

    return model_output