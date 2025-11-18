// importando components do bootstrap
import Container from "react-bootstrap/Container";


// Importando o componente de formulário
import FormularioAnimal from "../../components/FormularioAnimal/FormularioAnimal";

const CadastrarAnimal = () => {

  return (
    <div>
      <Container>
        <h1>Cadastrar Animal</h1>
        <FormularioAnimal page="cadastro" />
      </Container>
    </div>
  );
};

export default CadastrarAnimal;
