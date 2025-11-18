// importando components do bootstrap
import Container from "react-bootstrap/Container";


// Importando o componente de formulário
import FormularioAgendamento from "../../components/FormularioAgendamento/FormularioAgendamento";

const CadastrarAgendamento = () => {

  return (
    <div>
      <Container>
        <h1>Cadastrar Agendamento</h1>
        <FormularioAgendamento page="cadastro" />
      </Container>
    </div>
  );
};

export default CadastrarAgendamento;
