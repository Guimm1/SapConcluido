import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Home = () => {
  return (
    <div>
      <h1>Bem vindo ao Agenda Pet</h1>
      <Row className="g-4 d-flex flex-wrap flex-row">
        <Col xs={12} md={3}>
          <Card>
            <Card.Img
              variant="top"
              height="300px"
              src="https://vetery.com.br/wp-content/uploads/2023/08/5-dicas-para-evitar-o-estresse-durante-a-visita-ao-veterinario.jpg"
            />
            <Card.Body>
              <Card.Title>Cadastrar Pet </Card.Title>
              <Card.Text>Cadastre seu pet</Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src="https://wellvet.vet.br/wp-content/uploads/veterinario-a-domicilio-img.jpg" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img
              variant="top"
              height="300px"
              src="https://sindan.org.br/wp-content/uploads/2022/06/50d5403d-91ca-4679-ae62-0f208f14be57-1024x675.jpg"
            />
            <Card.Body>
              <Card.Title>Cadastre um tutor</Card.Title>
              <Card.Text>Cadastre um tutor</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
