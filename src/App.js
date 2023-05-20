import axios from "axios";
import { getAuth } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Dashbord from "./Components/Admin/Dashboard";
import FullDetails from "./Components/Admin/FullDetails";
import Editor from "./Components/Editor/Editor";
import Header from "./Components/Header/Header";
import Login from "./Components/LoginInfo/Login";
import app from "./Components/LoginInfo/firebase.config";
import ForgetPass from "./Components/NewUser/ForgetPass";
import NewUser from "./Components/NewUser/NewUser";
import VerifyEmail from "./Components/NewUser/VerifyEmail";
import AboutUs from "./Components/Shared/AboutUs";
import Copyright from "./Components/Shared/Copyright";
import Help from "./Components/Shared/Help";
import News from "./Components/Shared/News";
import Nomatch from "./Components/Shared/Nomatch";
import OpenAccess from "./Components/Shared/OpenAccess";
import AuthorMainMenu from "./Components/Submit/AuthorMainMenu";
import Submit from "./Components/Submit/Submit";
import Test from "./Components/Test/Test";
import Aim from "./Explore/Aim";
import ContactUs from "./Explore/ContactUs";
import GuidLine from "./Explore/GuidLine";
import ReviewPolicy from "./Explore/ReviewPolicy";
import SuccessSubmission from "./SuccessSubmission/SuccessSubmission";
import { authorContext } from "./contexts/AuthorContext";
import AuthorNavbar from "./layout/AuthorNavbar";
import DashboardLayout from "./layout/DashboardLayout";
import ExploreNavbar from "./layout/ExploreNavbar";
import Main from "./layout/Main";
import PrivateRoute from "./routes/PrivateRoute";

export const editorContext = createContext();
export const reviewerContext = createContext();
export const dataContext = createContext();
export const userNameContext = createContext();
export const loginUserContext = createContext();

function App() {
  const auth = getAuth(app);
  const initialLoginUserEmail = localStorage.getItem("loginUserEmail") || "";
  const [loginUserEmail, setLoginUserEmail] = useState(initialLoginUserEmail);

  const [user, loading] = useAuthState(auth);
  const [data, setData] = useState([]);
  const [editor, setEditor] = useState([]);
  const [reviewer, setReviewer] = useState([]);
  const [submittedFile, setSubmittedFile] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [author, setAuthor] = useState([]);
  const [name, setName] = useState("");

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
      .get(`http://localhost:4000/author/?email=${loginUserEmail}`)
      .then((res) => {
        setAuthor(res.data);
      })
      .catch((err) => {});
  }, [loginUserEmail]);

  const headers = {
    "Content-Type": "application/json",
    authorization: `bearer ${localStorage.getItem("accessToken")}`,
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:4000/submittedData?email=${loginUserEmail}`,
          {
            method: "GET",
            headers: headers,
          }
        );

        if (response.ok) {
          const data = await response.json();
          setData(data);
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
  }, [loginUserEmail]);

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
    <loginUserContext.Provider value={[loginUserEmail, setLoginUserEmail]}>
      <userNameContext.Provider value={[name, setName]}>
        <authorContext.Provider value={[author, setAuthor]}>
          <reviewerContext.Provider value={[reviewer, setReviewer]}>
            <editorContext.Provider value={[editor, setEditor]}>
              <dataContext.Provider value={[data, setData]}>
                <RouterProvider router={router} />
              </dataContext.Provider>
            </editorContext.Provider>
          </reviewerContext.Provider>
        </authorContext.Provider>
      </userNameContext.Provider>
    </loginUserContext.Provider>
  );
}

export default App;
