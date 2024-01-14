import { Col, Row } from "react-bootstrap";

const SubForecastElement = (props) => {
  const elementoData = props.ora.split(" ");
  const orario = elementoData[1].slice(0, 5);

  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  return (
    <>
      <Row xs={4}>
        <Col>
          <p>{orario}</p>
        </Col>
        <Col className="ps-1">
          <img src={getWeatherIconUrl(props.icon)} alt="Icona meteo" style={{ width: "35px" }} />
        </Col>
        <Col className="ps-2">
          <p>{props.tempMax}°C</p>
        </Col>
        <Col className="ps-2">
          <p>{props.tempMin}°C</p>
        </Col>
      </Row>
    </>
  );
};

export default SubForecastElement;
