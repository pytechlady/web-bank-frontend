import React, {useRef, useEffect, useState} from "react";
import { faCheck, faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^[a-zA-Z0-9]{8,24}$/;
const REGISTER_URL = "http://127.0.0.1:8000/webank/register";

const RegisterAdmin = () => {
    let navigate = useNavigate();

    const UserRef = useRef();
    const EmailRef = useRef();
    const errRef = useRef();

    const [username , setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email , setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password , setPassword] = useState('');
    const [validpassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false)


    useEffect(() => {
        EmailRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USERNAME_REGEX.test(username);
        console.log(result)
        console.log(username);
        setValidName(result);
    }, [username])

    useEffect(() => {
        const result = email;
        console.log(result)
        console.log(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        console.log(result)
        console.log(password);
        setValidPassword(result);
    }, [password])

    useEffect(() => {
        setErrMsg('');
    }, [username, password, email])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USERNAME_REGEX.test(username);
        const v2 = (email);
        const v3 = PWD_REGEX.test(password);
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }
    try {
        const response = await axios.post(REGISTER_URL, 
            JSON.stringify({username, email, password}),
            {
                headers: { 'Content-Type': 'application/json'},
            });
            navigate("/verifyemail")
            console.log(response.data);
            console.log(JSON.stringify(response))
            setSuccess(true);
    } catch(err) {
        if (!err?.response) {
            setErrMsg('No server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Email already taken');
        } else {
            setErrMsg('Registration Failed');
        }
        errRef.current.focus();
    }
}


    return (
        <>
        {success ? (
            <section>
                <h1>Success!</h1>
            </section>
        ) : (
            <section>
            <p ref={errRef} className={errMsg ? "errmsg" : 
            "offscreen"} aria-live="assertive">{errMsg}</p>
            <div className="container col-sm-6 offset-sm-3 mb-5 mt-5 ">
                <center>
                    <h1 className="register">Register</h1>
                </center>
            <form onSubmit={handleSubmit} className='m-5'>
                <div className="mb-3 form-group">
                    <label htmlFor="exampleInputEmail1">Email address:
                    <span className={validEmail ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validEmail || !email ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                    </label>
                    <input type="email" ref={EmailRef} autoComplete="off"
                     onChange={(e) =>setEmail(e.target.value)} 
                     className="form-control" id="exampleInputEmail1" 
                     aria-describedby="uidnote" value={email}
                     onFocus={() => setEmailFocus(true)}
                     onBlur={() => setEmailFocus(false)}/>
                     <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                         <FontAwesomeIcon icon={faInfoCircle} />
                         Please use a valid email address
                     </p>
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="exampleInputusername">Username: 
                    <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validName || !username ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                    </label>
                    <input type="text" ref={UserRef} autoComplete="off"
                     onChange={(e) =>setUsername(e.target.value)} 
                     className="form-control" id="exampleInputusername" 
                     value={username} aria-describedby="uidnote"
                     onFocus={() => setUserFocus(true)}
                     onBlur={() => setUserFocus(false)}/>
                     <p id="uidnote" className={userFocus && username && !validName ? "instructions" : "offscreen"}>
                         <FontAwesomeIcon icon={faInfoCircle} />
                         Your username should be a minimum of 3 and maximum of 24 characters
                     </p>
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="exampleInputPassword1">Password: 
                    <span className={validpassword ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validpassword || !password ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span></label>
                    <input type="password" onChange={(e) =>setPassword(e.target.value)} 
                    className="form-control" id="exampleInputPassword1" 
                    value={password} required
                    aria-invalid={validpassword ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)} />
                    <p id="pwdnote" className={passwordFocus && !validpassword ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters. <br />
                        Must include lowercase letters, a number and special characters. <br />
                    </p>
                </div>
                <button disabled={!validName || !validpassword || !validEmail ? true : false} type="submit" className="btn btn-primary mb-3">Register</button>
            </form>
            </div> 
            </section>
        ) 
}
</>
    )
}

export default RegisterAdmin