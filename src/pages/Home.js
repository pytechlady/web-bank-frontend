import React from "react";
import Bank from '../assets/images/Bank.png';
import Money from '../assets/images/Cash.png';
import { Link } from 'react-router-dom';



const Home = () => {
    return (
        <React.Fragment>
            <div className="container home">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-6 h-text">
                        <h1>WeBank Online Banking</h1>
                        <p className='me-5'>Account opening made easy and convenient</p>
                        <Link to='/register'>
                        <button className='red' type='submit'>Register</button>
                        </Link>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6">
                    <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item">
                            <img src={Bank} className="d-block w-100 img" alt="bank"/>
                            </div>
                            <div className="carousel-item active">
                            <img src={Money} className="d-block w-100 img" alt="money"/>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home;