import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <Routes>
        <Route exact to="/" component={Home} />
      </Routes>
    </div>
  );
}

export default App;
