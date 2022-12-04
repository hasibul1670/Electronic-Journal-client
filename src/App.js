
import './App.css';
import Header from './Components/Header/Header';

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import Nomatch from './Components/Shared/Nomatch';
import Login from './Components/LoginInfo/Login';
import Author from './Components/Author/Author';
import AuthorMainMenu from './Components/Author/AuthorMainMenu';
import Submit from './Components/Submit/Submit';




function App() {
  return (
    <Router>
  <Switch>
  <Route exact path="/home"><Header></Header> </Route>
  <Route exact path="/"><Header></Header> </Route>
  <Route path="/login"><Login></Login></Route>
  <Route path="/author"><Author></Author></Route>
  <Route path="/mainmenu"><AuthorMainMenu></AuthorMainMenu></Route>
  <Route path="/submit"> <Submit></Submit></Route>



 <Route path="*"><Nomatch></Nomatch> </Route>

 

        </Switch>


    </Router>

   
  );
}

export default App;
