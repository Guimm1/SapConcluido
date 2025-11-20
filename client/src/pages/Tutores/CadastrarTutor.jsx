// importando components do bootstrap
import Container from "react-bootstrap/Container";


// Importando o componente de formulário
import FormularioTutor from "../../components/FormularioTutor/FormularioTutor";

const CadastrarTutor = () => {

  return (
    <div>
      <Container>
        <h1>Adicionar produto no estoque</h1>
        <FormularioTutor page="cadastro" />
      </Container>
    </div>
  );
};

export default CadastrarTutor;
