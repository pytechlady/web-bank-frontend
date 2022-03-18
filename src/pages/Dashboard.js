import React from "react";
import CC from '../assets/images/cc.png';
import { faMoneyBill, faCloudDownload, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";





const Dashboard = () => {
    return (
        <React.Fragment>
            <div className="container dashboard flex2">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-6">
                        <img src={CC} className='w-100' alt='cc'/>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6 col2">
                        <h4>Your Balance</h4>
                        <h1>$6,120</h1>
                        <div className="box-case">
                        <div className='box box1'>
                        <Link to="/createaccount">
                            <FontAwesomeIcon icon={faMoneyBill} />
                        </Link>
                        </div>
                            <div className='box box2'>
                            <FontAwesomeIcon icon={faCloudDownload} />
                            </div>
                            <div className='box box3'>
                            <FontAwesomeIcon icon={faBell} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment> 
    ) 
}

export default Dashboard