import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import User from "./Components/Users";

function App() {
  return (
    <div className="App">
      {
        /* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"s
        >
          Learn React
        </a>
      </header> */
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Users" element={<User />} />
        </Routes>
      }
    </div>
  );
}

export default App;
