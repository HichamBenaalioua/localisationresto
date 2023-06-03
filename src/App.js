import logo from "./logo.svg";
import "./App.css";
import SignIn from "./components/SignIn";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { useEffect } from "react";
import SignUp from "./components/SignUp";
import Map from "./Map";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Map />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="dashboard/*" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
