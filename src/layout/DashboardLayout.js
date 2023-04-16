import React from 'react';
import AuthorNav from '../Components/Shared/AuthorNav';
import { Outlet } from 'react-router';
import useAdmin from '../Hooks/useAdmin';
import { getAuth } from 'firebase/auth';
import app from '../Components/LoginInfo/firebase.config';
import { useAuthState } from 'react-firebase-hooks/auth';

const DashboardLayout = () => {

    return (
      <div>
        <AuthorNav />
        <Outlet ></Outlet>
      </div>
    );
};

export default DashboardLayout;