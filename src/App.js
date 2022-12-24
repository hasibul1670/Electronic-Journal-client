
import './App.css';
import Header from './Components/Header/Header';

import {
  BrowserRouter as Router,
  Routes ,Route


} from "react-router-dom";
import Nomatch from './Components/Shared/Nomatch';
import Login from './Components/LoginInfo/Login';
import AuthorMainMenu from './Components/Author/AuthorMainMenu';
import Submit from './Components/Submit/Submit';
import SubmitHome from './Components/Submit/SubmitHome';
import NewUser from './Components/NewUser/NewUser';
import ForgetPass from './Components/NewUser/ForgetPass';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Dashbord from './Components/Admin/Dashboard';
import Editor from './Components/Editor/Editor';
import { createContext } from 'react';
import { ToastContainer} from 'react-toastify';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import MySubmission from './Components/Admin/MySubmission';
import MyPublished from './Components/Admin/MyPublished';
export const editorContext = createContext();


function App() {
const [editor, setEditor] = useState([]);    
useEffect(() => {
  axios
  .get('http://localhost:4000/author')
  .then(res => {

      console.log(res)
      setEditor(res.data);

    })
  .catch(err=>{
      console.log(err)
  })
}, [])
  return (

    <editorContext.Provider value={[editor,setEditor]}>
    <Router>
  <Routes>

  <Route exact path="/" element={<Header/> }/>
  <Route path="/login"  element={<Login/>} ></Route>
  <Route exact path="/" element={<Header/>} > </Route>




  <Route path="/newuser"element={<NewUser/>}> </Route>
  <Route path="/forgetpass" element={<ForgetPass/>}> </Route>



{/* private Route */}
  <Route path="/mainmenu" element={<PrivateRoute><AuthorMainMenu/></PrivateRoute>}> </Route>

  <Route path="/dashboard" element={<PrivateRoute><Dashbord/></PrivateRoute>
}>
<Route index element={<MySubmission/>}></Route>
<Route path="published" element={<MyPublished/>}> </Route>

</Route>

  <Route path="/submithome" element= {<PrivateRoute><SubmitHome/></PrivateRoute>}></Route>
  <Route path="/submit"element= {<PrivateRoute><Submit/></PrivateRoute>}></Route>
  <Route path="/editor" element={<PrivateRoute><Editor/></PrivateRoute>}></Route>

 <Route path="*" element={<Nomatch/>}> </Route>

 

        </Routes>


    </Router>
    <ToastContainer/>
    </editorContext.Provider>


   
  );
}

export default App;
