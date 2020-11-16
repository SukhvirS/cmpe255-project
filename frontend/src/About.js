import React from 'react';
import MyNavbar from './MyNavbar'
// import BackgroundImage from './images/house.jpg';
import JupViewer from './JupViewer'

class About extends React.Component{
    render(){
        return(
            <div>
                <MyNavbar color='black'/>
                <div style={{margin:'20px 100px', style:'Raleway'}}>
                    <div className='jumbotron'>
                        <div style={{width:'100%'}}>
                            <h4 style={{margin:'0 30px', width:'100px', float:'left'}}>Group 6</h4>
                            <div style={{display:'flex', justifyContent:'center', float:'right'}}>
                                <p style={{margin:'0 30px'}}>Sukhvir Singh</p>
                                <p style={{margin:'0 30px'}}>Tyler Tran</p>
                                <p style={{margin:'0 30px'}}>Rich Chau</p>
                                <p style={{margin:'0 30px'}}>Roopesha Rai</p>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <hr/>
                        This website is built using <a href='https://reactjs.org/' target='_blank' rel="noopener noreferrer">React.js</a> for the frontend, and <a href='https://flask.palletsprojects.com/en/1.1.x/' target='_blank' rel="noopener noreferrer">Flask</a> for the backend. The dataset we used is <a href='https://www.kaggle.com/c/zillow-prize-1/data' target='_blank' rel="noopener noreferrer">Zillow's Home Value Prediction</a> dataset. Below is our Jupyter Notebook which contains our data analysis, visualizations, data imputation, and models. The complete code for this project (including the code for the frontend and the backend) is available on <a href='https://github.com/SukhvirS/cmpe255-project' target='_blank' rel="noopener noreferrer">GitHub</a>.
                        <br/>
                        <br/>

                        <div style={{overflow:'scroll', height:'80vh', border:'1px solid black'}}>
                            <JupViewer
                            file="https://raw.githubusercontent.com/SukhvirS/cmpe255-project/master/Zillow_data_analysis.ipynb"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About