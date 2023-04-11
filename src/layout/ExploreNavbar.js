import React from 'react';
import ExploreNav from '../Explore/ExploreNav';
import { Outlet } from "react-router";

const ExploreNavbar = () => {
    return (
        <div>
             <ExploreNav/>
      <Outlet></Outlet>
        </div>
    );
};

export default ExploreNavbar;