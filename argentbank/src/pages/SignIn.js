import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { accountService } from "../Api/CallData";
import { useDispatch } from "react-redux";
import { setUserData, setTokenData } from "../feature/User";

console.log(accountService)

const SignInWrapper = styled.div`
.sign-in-button {
  display: block;
  width: 100%;
  padding: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 1rem;
  border-color: #00bc77;
  background-color: #00bc77;
  color: #fff;
}

.sign-in-content {
  box-sizing: border-box;
  background-color: white;
  width: 300px;
  margin: 0 auto;
  margin-top: 3rem;
  padding: 2rem;
}

.sign-in-icon {
  font-size: 5rem;
}

.input-remember {
  display: flex;
}

.input-remember label {
  margin-left: 0.25rem;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 1rem;
}

.input-wrapper label {
  font-weight: bold;
}

.input-wrapper input {
  padding: 5px;
  font-size: 1.2rem;
}
`;

function SignIn() {
 

  //state for store the login of user
  const [login, setLogin] = useState({
    email: '',
    password: '' 
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //function for set the login state with value of input password and email
  function onChangeInput(e) {
    setLogin({
        ...login,
        [e.target.name]: e.target.value
    })
}


  //function for submit login's form
  function onSubmitForm(e) {
    e.preventDefault();
    accountService.login(login).then((res) => {dispatch(setTokenData(res.data));
    accountService.getProfile(res.data.body.token).then((res) => {
          console.log(res);
          dispatch(setUserData(res.data));
          navigate("/user");
        });
      })
      .catch((error) => {
        // setErrorLogin("User not found!");
        console.log(error.response.data.message);
      });
  }

  return (
    <>
      <Header />
      <SignInWrapper>
        <main className="main bg-dark">
          <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={onSubmitForm}>
              <div className="input-wrapper">
                <label>Username</label>
                <input
                  name="email"
                  type="text"
                  value={login.email}
                  onChange={(e) => {onChangeInput(e)}}
                />  
              </div>
              <div className="input-wrapper">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  value={login.password}
                  onChange={(e) => {onChangeInput(e)}}
                />
              </div>
              <div className="input-remember">
                <input type="checkbox" id="remember-me" />
                <label>Remember me</label>
              </div>
              <button className="sign-in-button">Sign In</button>
            </form>
          </section>
        </main>
      </SignInWrapper>
      <Footer />
    </>
  );
}

export default SignIn;
