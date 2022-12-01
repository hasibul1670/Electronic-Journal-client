import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//mport {library} from "@fortawesome/free-solid-svg-core";
import { faUser ,faEye,faEyeSlash, faLock,faEnvelope} from '@fortawesome/free-solid-svg-icons'
//library.add (faUser,faEye,faLock,faEyeSlash,faEnvelope);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
