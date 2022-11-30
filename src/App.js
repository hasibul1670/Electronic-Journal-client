
import './App.css';
import Header from './Components/Header/Header';

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import Nomatch from './Components/Nomatch';

function App() {
  return (
    <Router>
  <Switch>
          
  <Route path="/"><Header></Header> </Route>
 <Route path="*"><Nomatch></Nomatch> </Route>

        </Switch>


    </Router>
    
  );
}

export default App;
