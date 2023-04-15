import React from 'react';
import AuthorNav from '../Components/Shared/AuthorNav';
import { Outlet } from 'react-router';

const DashboardLayout = () => {
    return (
      <div>
        <AuthorNav />
        <Outlet ></Outlet>
      </div>
    );
};

export default DashboardLayout;