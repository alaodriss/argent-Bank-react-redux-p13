import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home";
import SignIn from "../src/pages/SignIn";
import GlobalStyle from './styles/globalStyle'
import User from "./pages/User";
import Page404 from './pages/Page404'
function App() {
    return (

    <BrowserRouter>
        <GlobalStyle />
        <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='signin' exact element={<SignIn />} />
            <Route path='user' exact element={<User />} />
            <Route path={'*'} element={<Page404 />}/>  

        </Routes>
    </BrowserRouter>
  );
}

export default App;
