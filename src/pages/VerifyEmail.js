import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const VERIFY_URL = "https://webankapp.herokuapp.com/webank/email-verify";



const VerifyEmail = () => {
    let navigate = useNavigate();

    const otpRef = useRef();
    const emailRef = useRef();
    const errRef = useRef();

    const [otp , setOtp] = useState('');
    const [email , setEmail] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, otp])

    const handleSubmit = async (e) => {
        e.preventDefault();

    try {
        const response = await axios.post(VERIFY_URL, 
            JSON.stringify({email, otp}),
            {
                headers: { 'Content-Type': 'application/json'}
            });
            console.log(JSON.stringify(response?.data));
            navigate("/login")
            setEmail('');
            setOtp('');
            setSuccess(true);

    } catch (err) {
        if (!err?.response) {
            setErrMsg("No server response");
        } else if (err.response?.status === 400) {
            setErrMsg("Please provide a valid otp and email")
        } else if (err.response?.status === 401) {
            setErrMsg("Unauthorized");
        } else {
            setErrMsg("Account verification failed");
        }
        errRef.current.focus();
    }
}

    return (
        <>
        {success ? (
            <section>
                <h1>Your account has been successfully verified</h1>
            </section>
        ) : (
            <section>
            <p ref={errRef} className={errMsg ? "errmsg" : 
            "offscreen"} aria-live="assertive">{errMsg}</p>
            <div className="container col-sm-6 offset-sm-3 mb-5 mt-5 ">
                <center>
                    <h1 className="register">Verify Email</h1>
                </center>
            <form onSubmit={handleSubmit} className='m-5'>
                <p>Please verify your email by pasting the otp sent to your email below</p>
                <div className="mb-3 form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" ref={emailRef} autoComplete="off" onChange={(e) =>setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email}/>
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="exampleInputotp">OTP</label>
                    <input type="text" ref={otpRef} autoComplete="off" onChange={(e) =>setOtp(e.target.value)} className="form-control" id="exampleInputotp" value={otp}/>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            </div>
            </section>
        ) 
    }
    </>
        )
    }

export default VerifyEmail