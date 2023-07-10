import React, { useRef, useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from '../context/AuthProvider';
import { useNavigate } from "react-router-dom";


const ACCOUNT_URL = "https://webbank-u3j6.onrender.com/webank/create-account";

const CreateAccount = () => {
    const fullnameRef = useRef();
    const occupationRef = useRef();
    const genderRef = useRef();
    const account_typeRef = useRef();
    const phone_numberRef = useRef();
    const addressRef = useRef();
    const errRef = useRef();

    let navigate = useNavigate();

    const {auth} = useContext(AuthContext);

    // console.log(auth.accessToken, "***")
    // console.log(auth, "***")

    const [fullname , setFullname] = useState('');
    const [occupation , setOccupation] = useState('');
    const [gender , setGender] = useState('');
    const [account_type, setAccountType] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false)


    useEffect(() => {
        fullnameRef.current.focus();
    }, [])


    useEffect(() => {
        setErrMsg('');
    }, [fullname, occupation, gender, account_type, phone_number, address])

    const handleSubmit = async (e) => {
        e.preventDefault();
    try {
        const response = await axios.post(ACCOUNT_URL, 
            JSON.stringify({fullname, occupation, gender, account_type, phone_number, address}),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':  `Token ${auth.accessToken}`
                }
            });
            navigate("/dashboard")
            console.log(response.data);
            console.log(JSON.stringify(response))
            setSuccess(true);
    } catch(err) {
        if (!err?.response) {
            setErrMsg('No server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Account creation failed. Contact Administration');
        } else if (err.response?.status === 401) {
            setErrMsg('UnAuthorised');
        } else {
            setErrMsg('Account creation Failed');
        }
        errRef.current.focus();
    }
}
    return (
        <>
        {success ? (
            <section>
                <h1>Account created successfully</h1>
            </section>
        ) : (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : 
            "offscreen"} aria-live="assertive">{errMsg}</p>
            <div className="container col-sm-6 offset-sm-3 mb-5 mt-5">
                <center>
                    <h1 className="register">Create Account</h1>
                </center>
            <form onSubmit={handleSubmit} className='m-4'>
                <div className="mb-3 form-group">
                    <label htmlFor="exampleInputFullname">Fullname</label>
                    <input type="text" ref={fullnameRef} autoComplete="off" value={fullname} onChange={(e) =>setFullname(e.target.value)} className="form-control" id="exampleInputFullname"/>
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="exampleInputOccupation">Occupation</label>
                    <input type="text" ref={occupationRef} autoComplete="off" value={occupation} onChange={(e) =>setOccupation(e.target.value)} className="form-control" id="exampleInputOccupation"/>
                </div>
                <div className="mb-3 form-group">
                <label htmlFor="exampleInputGender">Gender</label>
                <select className="form-select" onChange={(e) =>setGender(e.target.value)} ref={genderRef} autoComplete="off" aria-label="Default select example">
                    <option selected>Select your gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Binary">Binary</option>
                </select>
                </div>
                <div className="mb-3 form-group">
                <label htmlFor="exampleInputAccount">Account Type</label>
                <select className="form-select" onChange={(e) =>setAccountType(e.target.value)} ref={account_typeRef} autoComplete="off" aria-label="Default select example">
                    <option selected>Select preferred account type</option>
                    <option value="Savings account">Savings</option>
                    <option value="Current Account">Current</option>
                    <option value="Fixed Account">Fixed</option>
                </select>
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="exampleInputPhone">Phone number</label>
                    <input type="tel" value={phone_number} onChange={(e) =>setPhoneNumber(e.target.value)} ref={phone_numberRef} autoComplete="off" className="form-control" id="exampleInputPhone"/>
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="exampleInputAddress">Address</label>
                    <input type="text" value={address} onChange={(e) =>setAddress(e.target.value)} ref={addressRef} autoComplete="off" className="form-control" id="exampleInputAddress"/>
                </div>
                <button type="submit" className="btn btn-primary">Create Account</button>
            </form>
            </div>
            </section>
        ) 
    }
    </>
        )
    }

export default CreateAccount