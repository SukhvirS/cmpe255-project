import React from 'react';
import MyNavbar from './MyNavbar';
import BackgroundImage from './images/house.jpg';
import StateSelector from './StateSelector';

var devUrl = '/getPrediction'
var prodUrl = 'https://cmpe255-backend.herokuapp.com/getPrediction'

class Home extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            latitude: 37.334665328,
            longitude:  -121.875329832,
            bedrooms: 3,
            bathrooms: 2,
            sqft: 1200,
            stories: 2,
            yearBuilt: 1980,
            rooms: 5,
            model: 'linear',
            prediction: null,

        }

        this.getPrediction = this.getPrediction.bind(this);
    }


    getPrediction(event){
        event.preventDefault();

        fetch(prodUrl, {
            method: "POST",
            body: JSON.stringify({
                longitude: this.state.longitude,
                latitude: this.state.latitude,
                bedrooms: this.state.bedrooms,
                bathrooms: this.state.bathrooms,
                sqft: this.state.sqft,
                stories: this.state.stories,
                yearBuilt: this.state.yearBuilt,
                rooms: this.state.rooms,
                model: this.state.model
            })
        })
        .then(res => res.json())
        .then(data => {
            var x = data
            var pred = x['prediction'];
            pred = parseFloat(pred).toFixed(2);     // 2 decimal places
            pred = pred.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");       // add commas
            this.setState({
                prediction: '$'+ pred.toString(),
            })
        })
    }

    render(){
        const style={
            width:'100vw',
            height:'calc(100vh)',
            backgroundImage: "url(" + BackgroundImage + ")",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat:'no-repeat',
        }

        return(
            <div style={style}>
                <MyNavbar color='white'/>
                <div style={{width:'45vw', margin:'0 auto 0 auto', backgroundColor:'white', borderRadius:'12px', padding:'30px'}}>
                    <h2>Enter info for a prediction</h2>
                    <hr/>
                    <div>
                        <form onSubmit={this.getPrediction}>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Model</label>
                                <div className="col-sm-10">
                                    <select className='form-control' defaultValue='linear' onChange={(e)=>{this.setState({model: e.target.value})}}>
                                        <option value='linear'>Linear</option>
                                        <option value='xgboost'>XGBoost</option>
                                        {/* <option value='neural'>Neural Network</option> */}
                                    </select>
                                </div>
                            </div>
                            <hr style={{borderTop: '1px dashed #e5e5e5'}}/>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Latitude</label>
                                <div className="col-sm-10">
                                    <input type="number" className="form-control" placeholder="37.334665328" required step='0.000000001' onChange={(e)=>{this.setState({latitude: e.target.value})}}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Longitude</label>
                                <div className="col-sm-10">
                                    <input type="number" className="form-control" placeholder="-121.875329832" required step='0.000000001' onChange={(e)=>{this.setState({longitude: e.target.value})}}/>
                                </div>
                            </div>
                            
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Bedrooms</label>
                                <div className="col-sm-10">
                                    <input type="number" className="form-control" placeholder="3" min='1' required onChange={(e)=>{this.setState({bedrooms: e.target.value})}}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Bathrooms</label>
                                <div className="col-sm-10">
                                    <input type="number" className="form-control" placeholder="2" min='1' required onChange={(e)=>{this.setState({bathrooms: e.target.value})}}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Total Rooms</label>
                                <div className="col-sm-10">
                                    <input type="number" className="form-control" placeholder="5" min='1' required onChange={(e)=>{this.setState({rooms: e.target.value})}}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Sqft.</label>
                                <div className="col-sm-10">
                                    <input type="number" className="form-control" placeholder="1200" min='1' required onChange={(e)=>{this.setState({sqft: e.target.value})}}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Year built</label>
                                <div className="col-sm-10">
                                    <input type="number" className="form-control" placeholder="1980" required onChange={(e)=>{this.setState({yearBuilt: e.target.value})}}/>
                                </div>
                            </div>

                            <button type='submit' className="btn btn-primary">Get Prediction</button>
                        </form>

                        <hr/>
                        <h4>Prediction: {this.state.prediction}</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home