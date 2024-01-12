import { Col, Row } from "react-bootstrap";

const ForecastElement = (props) => {
  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  //   converto le temperature
  const temperatureMax = props.maxTemp.toFixed(1);
  const temperatureMin = props.minTemp.toFixed(1);

  // Converto la stringa della data in un oggetto Date
  const dateObject = new Date(props.date);

  // Estraggo il nome del giorno della settimana
  const options = { weekday: "long" };
  const dayOfWeek = dateObject.toLocaleDateString("it-IT", options);

  return (
    <>
      <Row xs={4} className="cursor">
        <Col>
          <p>{dayOfWeek}</p>
        </Col>
        <Col>
          <img src={getWeatherIconUrl(props.iconCodes)} alt="wheather icon" style={{ width: "35px" }} />
        </Col>
        <Col>
          <p>{temperatureMax}°C</p>
        </Col>
        <Col>
          <p>{temperatureMin}°C</p>
        </Col>
      </Row>
    </>
  );
};

export default ForecastElement;
