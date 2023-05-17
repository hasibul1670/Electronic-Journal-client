import "./App.css";
import Header from "./Components/Header/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Nomatch from "./Components/Shared/Nomatch";
import Login from "./Components/LoginInfo/Login";
import AuthorMainMenu from "./Components/Submit/AuthorMainMenu";
import Submit from "./Components/Submit/Submit";
import SubmitHome from "./Components/Submit/SubmitHome";
import NewUser from "./Components/NewUser/NewUser";
import ForgetPass from "./Components/NewUser/ForgetPass";
import Dashbord from "./Components/Admin/Dashboard";
import Editor from "./Components/Editor/Editor";
import Test from "./Components/Test/Test";
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import AboutUs from "./Components/Shared/AboutUs";
import Help from "./Components/Shared/Help";
import News from "./Components/Shared/News";
import OpenAccess from "./Components/Shared/OpenAccess";
import Copyright from "./Components/Shared/Copyright";
import VerifyEmail from "./Components/NewUser/VerifyEmail";
import SuccessSubmission from "./SuccessSubmission/SuccessSubmission";
import FullDetails from "./Components/Admin/FullDetails";
import Main from "./layout/Main";
import AuthorNavbar from "./layout/AuthorNavbar";
import PrivateRoute from "./routes/PrivateRoute";
import Explore from "./Explore/Explore";
import Aim from "./Explore/Aim";
import ExploreNav from "./Explore/ExploreNav";
import ExploreNavbar from "./layout/ExploreNavbar";
import GuidLine from "./Explore/GuidLine";
import ContactUs from "./Explore/ContactUs";
import ReviewPolicy from "./Explore/ReviewPolicy";
import app from "./Components/LoginInfo/firebase.config";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import DashboardLayout from "./layout/DashboardLayout";
import useAdmin from "./Hooks/useAdmin";
import { Toaster } from "react-hot-toast";
import { authorContext } from './contexts/AuthorContext';

export const editorContext = createContext();
export const reviewerContext = createContext();
export const dataContext = createContext();
export const userNameContext = createContext();

function App() {
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const [data, setData] = useState([]);
  const [editor, setEditor] = useState([]);
  const [reviewer, setReviewer] = useState([]);
  const [submittedFile, setSubmittedFile] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [author, setAuthor] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:4000/reviewer")
      .then((res) => {
        setReviewer(res.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/editor", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("e-token")}`,
        },
      })
      .then((res) => {
        setEditor(res.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/author/?email=${user?.email}`)
      .then((res) => {
        setAuthor(res.data);
        //console.log('Hello',author);
      })
      .catch((err) => {});
  }, [user?.email,author]);

  


  const headers = {
    "Content-Type": "application/json",
    authorization: `bearer ${localStorage.getItem("accessToken")}`,
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:4000/submittedData?email=${user?.email}`, {
          method: "GET",
          headers: headers,
        });
  
        if (response.ok) {
          const data = await response.json();
          setData(data);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  
    fetchData();
  }, [user?.email]);





  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        { path: "/", element: <Header /> },
        { path: "/openaccess", element: <OpenAccess /> },
        { path: "/about", element: <AboutUs /> },
        { path: "/help", element: <Help /> },
        { path: "*", element: <Nomatch /> },
      ],
    },

    {
      path: "/submit",
      element: <AuthorNavbar />,
      children: [
        {
          path: "/submit",
          element: (
            <PrivateRoute>
              <Submit />{" "}
            </PrivateRoute>
          ),
        },
        { path: "/submit/submithome", element: <Header /> },
        { path: "/submit/mainmenu", element: <AuthorMainMenu /> },
      ],
    },

    {
      path: "/explore",
      element: <ExploreNavbar />,
      children: [
        { path: "/explore", element: <Aim /> },
        { path: "/explore/aim", element: <Aim /> },
        { path: "/explore/guideline", element: <GuidLine /> },
        { path: "/explore/contactus", element: <ContactUs /> },
        { path: "/explore/review-policy", element: <ReviewPolicy /> },
      ],
    },

    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          path: "/dashboard",
          element: (
            <PrivateRoute>
              {" "}
              <Dashbord />
            </PrivateRoute>
          ),
        },
       
        { path: "/dashboard/fulldetails/:id", element: <FullDetails /> },
      ],
    },

    { path: "/login", element: <Login /> },
    { path: "/newuser", element: <NewUser /> },
    { path: "/forgetPass", element: <ForgetPass /> },
    { path: "/mainmenu", element: <AuthorMainMenu /> },

    { path: "/editor/dashboard", element: <Editor /> },

    { path: "/test", element: <Test user={user} /> },
    { path: "/news", element: <News /> },
    { path: "/copyright", element: <Copyright /> },
    { path: "/SuccessSubmission", element: <SuccessSubmission /> },
    { path: "/verifyemail", element: <VerifyEmail /> },

    { path: "*", element: <Nomatch /> },
  ]);
  return (
    <userNameContext.Provider value={ [name, setName]} >
    <authorContext.Provider value={[author,setAuthor]}>
      <reviewerContext.Provider value={[reviewer, setReviewer]}>
        <editorContext.Provider value={[editor, setEditor]}>
          <dataContext.Provider value={[data, setData]}>
            <RouterProvider router={router} />
          </dataContext.Provider>
        </editorContext.Provider>
      </reviewerContext.Provider>
    </authorContext.Provider>
    </userNameContext.Provider>
  );
}

export default App;
