import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./componets/Home";
import WeatherShow from "./componets/WeatherShow";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav></nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/WeatherShow/:cityName" element={<WeatherShow />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
