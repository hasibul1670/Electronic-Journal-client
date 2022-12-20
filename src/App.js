
import './App.css';
import Header from './Components/Header/Header';

import {
  BrowserRouter as Router,
  Routes ,Route


} from "react-router-dom";
import Nomatch from './Components/Shared/Nomatch';
import Login from './Components/LoginInfo/Login';
import Author from './Components/Author/Author';
import AuthorMainMenu from './Components/Author/AuthorMainMenu';
import Submit from './Components/Submit/Submit';
import SubmitHome from './Components/Submit/SubmitHome';
import NewUser from './Components/NewUser/NewUser';
import ForgetPass from './Components/NewUser/ForgetPass';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Dashbord from './Components/Admin/Dashbord';
import Editor from './Components/Editor/Editor';
import { createContext } from 'react';
import { useState } from 'react';

export const editorContext = createContext();


function App() {
  const [editor, setEditor] = useState({});
  return (


    <editorContext.Provider value={[editor,setEditor]}>



    <Router>
  <Routes>

  <Route exact path="/" element={<Header/> }/>
  <Route path="/login"  element={<Login/>} ></Route>

  <Route exact path="/" element={<Header/>} > </Route>


  
  <Route path="/author" element={<Author/>}></Route>

  <Route path="/submit" element={<Submit/>}> </Route>
  <Route path="/submithome" element={<SubmitHome/>}> </Route>
  <Route path="/newuser"element={<NewUser/>}> </Route>
  <Route path="/forgetpass" element={<ForgetPass/>}> </Route>

  <Route path="/editor" element={<Editor/>}> </Route>

{/* private Route */}
  <Route path="/mainmenu" element={<PrivateRoute><AuthorMainMenu/></PrivateRoute>}> </Route>
  <Route path="/dashbord" element={<PrivateRoute><Dashbord/></PrivateRoute>}> </Route>

 <Route path="*" element={<Nomatch/>}> </Route>

 

        </Routes>


    </Router>
    </editorContext.Provider>

   
  );
}

export default App;
