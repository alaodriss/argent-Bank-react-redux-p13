import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Footer from "../components/Footer";
import SignIn from './SignIn';
import Header from '../components/Header';
import { useSelector,useDispatch } from 'react-redux';
import Axios from '../Api/DataApi';
import { editUserData } from '../feature/User';
import { useNavigate } from 'react-router-dom';

const UserWrapper = styled.div`
    .account {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid black;
      background-color: #fff;
      width: 80%;
      margin: 0 auto;
      flex-direction: column;
      padding: 1.5rem;
      box-sizing: border-box;
      text-align: left;
      margin-bottom: 2rem;
    }

    .account-amount {
      margin: 0;
      font-size: 2.5rem;
      font-weight: bold;
    }

    .account-amount-description {
      margin: 0;
    }

    .account-title {
      margin: 0;
      padding: 0;
      font-size: 1rem;
      font-weight: normal;
    }

    .account-content-wrapper {
      width: 100%;
      flex: 1;
    }

    .edit-button {
      border-color: #00bc77;
      background-color: #00bc77;
      color: #fff;
      font-weight: bold;
      padding: 10px;
    }

    .header {
      color: #fff;
      margin-bottom: 2rem;
    }

    .transaction-button {
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

    @media (min-width: 720px) {
      .account {
        flex-direction: row;
      }

      .account-content-wrapper.cta {
        flex: 0;
      }

      .transaction-button {
        width: 200px;
      }
    }

    .fa-user-circle:before {
      margin-left: 63rem;
    }
  `;
  
function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false)

  const [dataEdit, setDataEdit] = useState({
      firstName: '',
      lastName: '' 
  });

  //function for set the data state with value of input first and lastName
  function onChangeInput(e) {
      setDataEdit({
          ...dataEdit,
          [e.target.name]: e.target.value
      })
  }

  //Data recovery from the redux store (user information and token)
  const data = useSelector((state) => {
      if (state.user.users == null || state.user.users == undefined) {
          return null
      } else {
          return state.user.users.body
      }
  })
  const token = useSelector((state) => {
      if (state.user.token == null || state.user.token == undefined) {
          return null
      } else {
          return state.user.token.body.token
      }
  })

  //function for toggle inputs of edit last and firstName
  function ToggleButton() {
      setToggle(!toggle)
  }
  
  //function to edit last and firstName with the token, and store in redux and database 
  function handleEdit() {
      let config = {
          headers: {
            'Authorization': 'Bearer ' + token
          }
      }
      Axios.put('api/v1/user/profile', dataEdit, config)
           .then(() => {
              dispatch(editUserData([dataEdit.firstName, dataEdit.lastName]))
           })
  }

  //conition in a useEffect for navigate in signin page if data = null
  useEffect(()=>{
     if (data == null || token == null) {
          console.log(data);
       navigate('/user');
      }
  },[])

  return (
    <>
      <Header />
      <UserWrapper>
        {data ? (
          <div className="main bg-dark">
            <div className="header">
              <h1>
                Welcome back
                <br />
                <p style={toggle ? { display: "none" } : { marginTop: "0px" }}>
                  {data.firstName} {data.lastName}
                </p>
              </h1>
              {toggle ? (
                <>
                  <div>
                    <input
                       onChange={(e) => onChangeInput(e)}
                      className="input-changeName"
                      name="firstName"
                      value={dataEdit.firstName}
                      type="text"
                    />
                    <input
                       onChange={(e) => onChangeInput(e)}
                      className="input-changeName"
                      name="lastName"
                      value={dataEdit.lastName}
                      type="text"
                    />
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        handleEdit();
                        ToggleButton();
                      }}
                      className="button-change"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => ToggleButton()}
                      className="button-change"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => {
                    ToggleButton();
                  }}
                  className="edit-button"
                >
                  Edit Name
                </button>
              )}
            </div>
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
              <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                <p className="account-amount">$2,082.79</p>
                <p className="account-amount-description">Available Balance</p>
              </div>
              <div className="account-content-wrapper cta">
                <button
                  className="transaction-button"
                >
                  View transactions
                </button>
              </div>
            </section>
            <section className="account">
              <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                <p className="account-amount">$10,928.42</p>
                <p className="account-amount-description">Available Balance</p>
              </div>
              <div className="account-content-wrapper cta">
                <button
                    className="transaction-button"
                >
                  View transactions
                </button>
              </div>
            </section>
            <section className="account">
              <div className="account-content-wrapper">
                <h3 className="account-title">
                  Argent Bank Credit Card (x8349)
                </h3>
                <p className="account-amount">$184.30</p>
                <p className="account-amount-description">Current Balance</p>
              </div>
              <div className="account-content-wrapper cta">
                <button
                   className="transaction-button"
                >
                  View transactions
                </button>
              </div>
            </section>
          </div>
        ) : (
          <SignIn />
        )}
       </UserWrapper>
      <Footer /> 
    </>
  );
}

export default User;
