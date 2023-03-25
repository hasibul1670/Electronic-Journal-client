import "./App.css";
import Header from "./Components/Header/Header";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nomatch from "./Components/Shared/Nomatch";
import Login from "./Components/LoginInfo/Login";
import AuthorMainMenu from "./Components/Author/AuthorMainMenu";
import Submit from "./Components/Submit/Submit";
import SubmitHome from "./Components/Submit/SubmitHome";
import NewUser from "./Components/NewUser/NewUser";
import ForgetPass from "./Components/NewUser/ForgetPass";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Dashbord from "./Components/Admin/Dashboard";
import Editor from "./Components/Editor/Editor";
import Test from "./Components/Test/Test";
import { createContext } from "react";
import { ToastContainer } from "react-toastify";
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

export const editorContext = createContext();
export const dataContext = createContext();
export const authorContext = createContext();

function App() {
  const [editor, setEditor] = useState([]);
  const [submittedFile, setSubmittedFile] = useState([]);
  const [fileData, setFileData] = useState(null);
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/reviewer")
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

  return (
    <authorContext.Provider value={[author, setAuthor]}  >
    <editorContext.Provider value={[editor, setEditor]} >
      <dataContext.Provider value={[submittedFile]}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Header />} />
            <Route path="/login" element={<Login />}></Route>
            <Route exact path="/" element={<Header />}>
              {" "}
            </Route>
            <Route path="/newuser" element={<NewUser />}>
              {" "}
            </Route>
            <Route path="/forgetpass" element={<ForgetPass />}>
              {" "}
            </Route>
            {/* private Route */}
            <Route
              path="/mainmenu"
              element={
                <PrivateRoute>
                  <AuthorMainMenu />
                </PrivateRoute>
              }
            >
              {" "}
            </Route>
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashbord />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/submithome"
              element={
                <PrivateRoute>
                  <SubmitHome />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/submit"
              element={
                <PrivateRoute>
                  <Submit />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/editor"
              element={
                <PrivateRoute>
                  <Editor />
                </PrivateRoute>
              }
            ></Route>
            <Route path="/about" element={<AboutUs />}>
              {" "}
            </Route>
            {/* usePArams */}
            <Route path="/fulldetails" element={<FullDetails />} />
            <Route path="/fulldetails/:id" element={<FullDetails />} />
            <Route path="/help" element={<Help />}>
              {" "}
            </Route>
            <Route path="/test" element={<Test />}>
              {" "}
            </Route>
            <Route path="/news" element={<News />}>
              {" "}
            </Route>
            <Route path="/openaccess" element={<OpenAccess />}>
              {" "}
            </Route>
            <Route path="/copyright" element={<Copyright />}>
              {" "}
            </Route>
            <Route path="/SuccessSubmission" element={<SuccessSubmission />}>
              {" "}
            </Route>
            <Route path="/verifyemail" element={<VerifyEmail />}>
              {" "}
            </Route>
            verifyemail
            <Route path="*" element={<Nomatch />}>
              {" "}
            </Route>
          </Routes>
        </Router>
        <ToastContainer />
      </dataContext.Provider>
    </editorContext.Provider>
    </authorContext.Provider>
  );
}

export default App;
