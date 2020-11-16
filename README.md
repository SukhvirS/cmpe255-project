# CMPE 255 Group Project

- Sukhvir Singh
- Rich Chau
- Tyler Tran
- Roopesha Rai


### To use the project go to: https://cmpe255-project.herokuapp.com/
### How to compile and run the project locally
1. Download the code from [github](https://github.com/SukhvirS/cmpe255-project)
2. Open two terminal/command line windows (1 for backend server and 1 for frontend)
3. Start backend:
3a. in one of the terminal/command line windows cd into `backend/` folder
3b. create a virtual environment: `python -m venv venv/`
3c. activate virtual environment: `source venv/bin/activate`
3d. install all required packages using pip: `pip install -r requirements.txt`
3e. start the backend server using: `flask run`
4. Start frontend:
4a. in the other terminal/command line window cd into `frontend/` folder
4b. install all required libraries using `yarn install`
4c. start the frontend using `yarn start`
5. A new tab should open up at http://localhost:3000/ and the app should be running
**Note: the app is not currently using the backend server because the REST API url is set to use the live server deployed to Heroku. To change this so that it is using the local backend server you started in step 3, you will have to change the api call url in the `Home.js` file in the `frontend/src/` folder. To do so you can change line 35 from `fetch(prodUrl, {` to `fetch(devUrl, {`**
