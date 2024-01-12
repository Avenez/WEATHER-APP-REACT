import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ForecastElement from "../componets/ForecastElement";

const WeatherShow = () => {
  const [cityObj, setCityObj] = useState(null);
  const [cityWeatherData, setCityWeatherData] = useState(null);
  const [cityWeatherDataForecast, setCityWeatherDataForecast] = useState(null);
  const { cityName } = useParams();

  const capitalizedCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  const temperature = cityWeatherData?.main?.temp?.toFixed(1) || "";
  const temperaturePerc = cityWeatherData?.main?.feels_like?.toFixed(1) || "";

  const forecastArray = [];
  let giornoCorrente = null;

  cityWeatherDataForecast?.list?.forEach((elemento) => {
    const dataElemento = elemento?.dt_txt?.split(" ");
    const giornoElemento = dataElemento?.[0];
    const oraElemento = dataElemento?.[1];

    if (oraElemento === "12:00:00" && giornoCorrente !== giornoElemento) {
      forecastArray.push(elemento);
      giornoCorrente = giornoElemento;
    }
  });

  console.log(forecastArray);

  const APIKey = "2693517c12647f45bc5c1d7466449299";

  // Funzione per ottenere l'URL dell'icona basata sul codice restituito da OpenWeatherMap
  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  //   --------------------FETCH GEO DATA FROM NAME
  const fetchGeoData = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},IT&limit=2&appid=${APIKey}`
      );

      if (!response.ok) {
        throw new Error("Errore nella richiesta API");
      }

      const data = await response.json();

      const firstCity = data && data.length > 0 ? data[0] : null;

      setCityObj(firstCity);
      console.log(firstCity);
    } catch (error) {
      console.error("Errore durante la richiesta API:", error);
    }
  };

  //   --------------------FETCH WEATHER DATA FROM CITY GEO DATA
  const fetchWeatherData = async () => {
    try {
      if (!cityObj) {
        throw new Error("Dati della città non disponibili");
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${cityObj.lat}&lon=${cityObj.lon}&lang=it&units=metric&appid=${APIKey}`
      );

      if (!response.ok) {
        throw new Error("Errore nella richiesta API del meteo");
      }

      const weatherData = await response.json();
      setCityWeatherData(weatherData);
      console.log("questi sono i dati del tempo" + weatherData);
    } catch (error) {
      console.error("Errore durante la richiesta API del meteo:", error);
    }
  };

  //   --------------------FETCH WEATHER FORECAST DATA FROM GEO DATA
  const fetchForecastData = async () => {
    try {
      if (!cityObj) {
        throw new Error("Dati della città non disponibili");
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${cityObj.lat}&lon=${cityObj.lon}&lang=it&units=metric&appid=${APIKey}`
      );

      if (!response.ok) {
        throw new Error("Errore nella richiesta API del meteo previsionale");
      }

      const forecastData = await response.json();
      setCityWeatherDataForecast(forecastData);
      console.log(forecastData);
    } catch (error) {
      console.error("Errore durante la richiesta API del meteo previsionale:", error);
    }
  };

  const allMyFetch = async () => {
    try {
      console.log(cityName);

      await fetchGeoData();
      console.log(cityObj);

      if (cityObj) {
        await fetchWeatherData();
        console.log(cityWeatherData);
      }

      if (cityWeatherData) {
        await fetchForecastData();
        console.log(cityWeatherDataForecast);
      }
    } catch (error) {
      console.error("Errore durante le richieste API:", error);
    }
  };
  useEffect(() => {
    allMyFetch();
    console.log(cityObj);
    console.log(cityWeatherData);
    console.log(cityWeatherDataForecast);
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={10} className="text-center mt-5 ">
            <Row className="">
              <h1 className="display-2">{capitalizedCityName}</h1>
            </Row>
            <Row>
              <h2 className="display-1 mt-2 ">{temperature}°C</h2>
              <p className="h3 mt-2 ">{`Percepita: ${temperaturePerc}`}</p>
            </Row>
            <Row className="d-flex align-items-center">
              <Col xs={12} className="d-flex justify-content-center align-items-center m-0  ">
                <img
                  src={getWeatherIconUrl(cityWeatherData?.weather?.[0]?.icon)}
                  alt={cityWeatherData?.weather?.[0]?.description}
                  style={{ width: "35px" }}
                />
                <p className="mb-0 h6">{cityWeatherData?.weather?.[0]?.description}</p>
              </Col>
            </Row>
          </Col>
          <Col></Col>
        </Row>
        <Row xs={4} className="mt-3 mb-0 ">
          <Col></Col>
          <Col></Col>
          <Col>
            <p className="fw-bold">MAX</p>
          </Col>
          <Col>
            <p className="fw-bold">MIN</p>
          </Col>
        </Row>
        <Row>
          <Col>
            {forecastArray.map((day, index) => (
              <ForecastElement
                key={`day-id-${index}`}
                date={day?.dt_txt}
                iconCodes={day?.weather?.[0]?.icon}
                maxTemp={day?.main?.temp_max}
                minTemp={day?.main?.temp_min}
              />
            ))}
            <Row xs={4} className="cursor">
              <Col>
                <p>Martedì</p>
              </Col>
              <Col>
                <i class="bi bi-cloud-drizzle"></i>
              </Col>
              <Col>
                <p>12°C</p>
              </Col>
              <Col>
                <p>0°C</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default WeatherShow;
