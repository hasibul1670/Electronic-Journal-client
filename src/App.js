import "./App.css";
import Header from "./Components/Header/Header";
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
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


export const editorContext = createContext();
export const reviewerContext = createContext();
export const dataContext = createContext();

function App() {
  const [editor, setEditor] = useState([]);
  const [reviewer, setReviewer] = useState([]);
  const [submittedFile, setSubmittedFile] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [author, setAuthor] = useState([]);

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
      .get("http://localhost:4000/editor")
      .then((res) => {
        setEditor(res.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/author")
      .then((res) => {
        setAuthor(res.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    const url = "http://localhost:4000/submittedData";
    axios
      .get(url)
      .then((res) => {
        setSubmittedFile(res.data.data);
      })
      .catch((err) => {});
  }, []);

const router = createBrowserRouter([
{path: "/" ,  element: <Main/>,children:[
  { path:"/" ,element:<Header />},
  { path:"/openaccess" ,element:<OpenAccess />},
  { path:"/about" ,element:<AboutUs/>},
  { path:"/help" ,element:<Help/>},
  { path:"*" ,element:<Nomatch />}
]},

{path: "/submit" ,  element: <AuthorNavbar />,children:[
  { path:"/submit" ,element:<PrivateRoute ><Submit /> </PrivateRoute>},
  { path:"/submit/submithome" ,element:<Header />},
  { path:"/submit/mainmenu" ,element:<AuthorMainMenu />},
 
]},


{ path:"/login" ,element:<Login />},
{ path:"/newuser" ,element:<NewUser />},
{ path:"/forgetPass" ,element:<ForgetPass />},
{ path:"/mainmenu" ,element:<AuthorMainMenu />},
{ path:"/dashboard" ,element:<PrivateRoute><Dashbord/></PrivateRoute>},


{ path:"/fulldetails" ,element:<FullDetails />},
{ path:"/fulldetails/:id",element:<FullDetails/>},
{ path:"/editor/dashboard",element:<Editor/>},


{ path:"/test",element:<Test/>},
{ path:"/news" ,element:<News/>},
{ path:"/copyright",element:<Copyright/>},
{ path:"/SuccessSubmission",element:<SuccessSubmission/>},
{ path:"/verifyemail" ,element:<VerifyEmail/>},

{ path:"*" ,element:<Nomatch />}
])
  return (
  
  
      <reviewerContext.Provider value={[reviewer, setReviewer]}>
       
          <editorContext.Provider value={[editor, setEditor]}>
            <dataContext.Provider value={[submittedFile]}>
             
            <RouterProvider router={router}/>

            </dataContext.Provider>
          </editorContext.Provider>
     
      </reviewerContext.Provider>

  
  );
}

export default App;
