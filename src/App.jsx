import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./componets/Home";
import WeatherShow from "./componets/WeatherShow";
import SearchNotGood from "./componets/SearchNotGood";
import PageNotFound from "./componets/PageNotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav></nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/WeatherShow/:cityName" element={<WeatherShow />} />
          <Route path="/notFoud" element={<SearchNotGood />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
