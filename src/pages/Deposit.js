import React, { useRef, useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DEPOSIT_URL = "http://webankapp.herokuapp.com/webank/credit-account";

const Deposit = () => {
  const amountRef = useRef();
  const account_numberRef = useRef();
  const errRef = useRef();

  let navigate = useNavigate();

  const { auth } = useContext(AuthContext);

  const [account_number, setcustomer_account] = useState("");
  const [amount, setAmount] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    account_numberRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [account_number, amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        DEPOSIT_URL,
        JSON.stringify({ account_number, amount }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${auth.accessToken}`,
          },
        }
      );
      navigate("/dashboard");
      console.log(response.data);
      console.log(JSON.stringify(response));
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server Response");
      } else if (err.response?.status === 403) {
        setErrMsg(
          "Kindly confirm if User exist and active. Contact Administration"
        );
      } else if (err.response?.status === 400) {
        setErrMsg("UnAuthorised/Failed transaction");
      } else {
        setErrMsg("Account funding Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Account credited successfully</h1>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div className="container col-sm-6 offset-sm-3 mb-5 mt-5">
            <center>
              <h1 className="register">Credit Account</h1>
            </center>
            <form onSubmit={handleSubmit} className="container form mt-5">
              <div className="mb-3">
                <label htmlFor="exampleInputAmount" className="form-label">
                  Account number
                </label>
                <input
                  type="num"
                  ref={account_numberRef}
                  autoComplete="off"
                  value={account_number}
                  onChange={(e) => setcustomer_account(e.target.value)}
                  className="form-control"
                  id="exampleInputAmount"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputAmount" className="form-label">
                  Amount
                </label>
                <input
                  type="num"
                  ref={amountRef}
                  autoComplete="off"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="form-control"
                  id="exampleInputAmount"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Deposit
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Deposit;
