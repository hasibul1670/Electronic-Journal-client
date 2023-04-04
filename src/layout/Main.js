import React from 'react';
import Navbar from '../Components/Shared/Navbar';
import { Outlet } from 'react-router';

const Main = () => {
    return (
        <div>
            <Navbar/>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;