
import './App.css';
import Header from './Components/Header/Header';

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import Nomatch from './Components/Nomatch';
import Login from './Components/LoginInfo/Login';

function App() {
  return (
    <Router>
  <Switch>
  <Route exact path="/home"><Header></Header> </Route>
  <Route exact path="/"><Header></Header> </Route>
  <Route path="/login"><Login></Login></Route>
 <Route path="*"><Nomatch></Nomatch> </Route>

        </Switch>


    </Router>
    
  );
}

export default App;
