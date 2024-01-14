import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./componets/Home";
import WeatherShow from "./componets/WeatherShow";
import SearchNotGood from "./componets/SearchNotGood";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav></nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/WeatherShow/:cityName" element={<WeatherShow />} />
          {/* <Route path="*" element={<SearchNotGood />} /> */}
          <Route path="/notFoud" element={<SearchNotGood />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
