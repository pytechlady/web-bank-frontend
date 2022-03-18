import React from "react";
import CC from '../assets/images/cc.png';
import { faMoneyBill, faCloudDownload, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


const Admin = () => {
    return (
        <React.Fragment>
            <div className="container dashboard flex2">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-6">
                        <img src={CC} className='w-100' alt='cc'/>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6 col2">
                        <a href="/staff"><button type="submit" className="btn btn-primary m-2">Register Staff</button></a>
                        <Link to='/deposit'>
                        <button type="submit" className="btn btn-success m-2">Credit User</button>
                        </Link>
                        <Link to='/withdraw'>
                        <button type="submit" className="btn btn-danger m-2">Debit User</button>
                        </Link>
                        <div className="box-case">
                        <div className='box box1'>
                        
                        <a href="/createaccount"><FontAwesomeIcon icon={faMoneyBill} /></a>
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

export default Admin