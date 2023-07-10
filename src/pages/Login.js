import axios from "axios";
import React, {useRef, useEffect, useState, useContext } from "react";
import AuthContext from '../context/AuthProvider';
import { useNavigate } from "react-router-dom";


const LOGIN_URL = "https://webbank-u3j6.onrender.com/webank/login";


const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [is_staff] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v2 = (email);
        const v3 = (password);
        if (!v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }

        try {
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({email, password}),
                {
                    headers: { 'Content-Type': 'application/json',  
                },
                

                });
                console.log(JSON.stringify(response?.data));
                const accessToken = response?.data?.token;

                console.log(accessToken);

                setAuth( {email, password, is_staff, accessToken} );
                 if (response?.data?.staff === true) {
                navigate("/admin")
            } else {
                navigate('/dashboard')
            }
                setEmail('');
                setPassword('');
                setSuccess(true);

        } catch (err) {
            if (!err?.response) {
                setErrMsg("No server response");
            } else if (err.response?.status === 400) {
                setErrMsg("Ensure both email and password are correct and you have verified your account")
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login failed");
            }
            errRef.current.focus();
        }
       
    }





    return (
        <>
        {success ? (
            <section>
                <h1>You are logged in!</h1>
            </section>
        ) : (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : 
            "offscreen"} aria-live="assertive">{errMsg}</p>
            <div className="container col-sm-6 offset-sm-3 mb-5 mt-5">
                <center>
                <h1 className="login">Login</h1>
                </center>
            <form onSubmit={handleSubmit} className='m-5'>
                <div className="mb-3 form-group">
                    <label htmlFor="exampleInputEmail1">Email address:</label>
                    <input type="email" value={email} onChange={(e) =>setEmail(e.target.value)} 
                    className="form-control" id="exampleInputEmail1" 
                    aria-describedby="emailHelp"
                    ref={emailRef} autoComplete="off" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1">Password:</label>
                    <input type="password" value={password} onChange={(e) =>setPassword(e.target.value)} 
                    className="form-control" id="exampleInputPassword1" required/>
                </div>
                <button type="submit" className="btn btn-primary mb-3">Login</button>
                <p>
                    Need an account?
                    <span className="line">
                        <a href="/register">Register</a>
                    </span>
                </p>
            </form>
            </div>
        </section>
        ) 
    }
    </>
        )
    }

export default Login