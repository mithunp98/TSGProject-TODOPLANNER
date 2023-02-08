import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Addtask from '../../pages/Addtask/Addtask';
import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/addtask" element={<Addtask userId={0} accessToken={''} />} />
        </Routes>
    );
};

export default AppRoutes;
