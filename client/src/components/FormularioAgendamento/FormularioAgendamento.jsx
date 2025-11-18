// importando components do bootstrap
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

// Importando o hook useForm do react-hook-form
import { useForm } from "react-hook-form";

//Importação do navigate pra transitar entre páginas
//Importação do useParams para pegar o id fornecido na url
import { useNavigate, useParams } from "react-router-dom";

// Importando o hook useState para monitorar a mudança das variáveis
import { useState, useEffect } from "react";

// Importando o hook useInseriragendamento
import {
  useInserirAgendamento,
  useBuscarAgendamentoPorId,
  useAtualizaAgendamento,
} from "../../hooks/useAgendamentos";

// importacao do hook para buscar os animais
import { useListaAnimais } from "../../hooks/useAnimais";

const FormularioAgendamento = (props) => {
  // IMPORTAÇÃO E USO DO HOOK FORM
  // O register é usado para criar o objeto de registro, com os campos ditos abaico no código
  // O handlesubmit é usado para tratar do envio do fomulario, caso de erro ou sucesso
  // O formState é usado para monitorar o estado do formulário, como erros e sucesso
  // O errors é usado para monitorar os erros do formulário, como campos obrigatórios e validações
  // o watch é usado para monitorar os campos do formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  // IMPORTAÇÃO DOS HOOKS PARA INSERIR, E ATUALIZAR
  // Usando a funcao de inserir agendamento vinda do hook
  const { inserirAgendamento } = useInserirAgendamento();

  // Usando a funcao de buscar Funcionario por id e de atualizar o Funcionario
  const { buscarAgendamentoPorId } = useBuscarAgendamentoPorId();
  const { atualizaAgendamento } = useAtualizaAgendamento();

  // variavel para armazenar os clientes, que veio do hook
  const animais = useListaAnimais();

  // Guardando o id do Funcionario vindo da url
  const { id } = useParams();

  // Criando o navigate
  const navigate = useNavigate();

  //CASO O FORMULÁRIO SEJA DE EDIÇÃO, BUSCAR O Funcionario PELO ID
  if (props.page === "editar") {
    // Variavel que controla se o Funcionario já foi carregado
    const [carregado, setCarregado] = useState(false);

    // Effect pra buscar o Funcionario assim que o componente for montado
    useEffect(() => {
      async function fetchAgendamento() {
        try {
          const agendamento = await buscarAgendamentoPorId(id);
          // Se houver Funcionario, reseta o formulário com os dados do Funcionario
          if (agendamento && !carregado) {
            reset({
              id: agendamento.id,
              tipo: agendamento.tipo,
              data: agendamento.data,
              hora: agendamento.hora,
              status: agendamento.status,
              responsavel: agendamento.responsavel,
              animal: agendamento.animal,
            });
            // Evita chamadas múltiplas de reset
            setCarregado(true);
          }
        } catch (erro) {
          console.error("Erro ao buscar agendamento:", erro);
          // Se o erro for de Funcionario não encontrado, redireciona para a página inicial
          if (erro.message.includes("Unexpected")) {
            alert("agendamento não encontrado!");
            navigate("/home");
          }
        }
      }
      fetchAgendamento();
    }, []);
  }

  // FUNCOES QUE LIDAM COM O SUCESSO E ERRO DO FORMULÁRIO
  // funcao pra caso de sucesso na validacao do formulario
  // data é o objeto com os campos do formulário
  const onSubmit = (data) => {
    console.log("Dados:", data);
    if (props.page === "cadastro") {
      // Envia o objeto data para o hook inserir o produto
      data.status = "Agendado";
      inserirAgendamento(data);
      alert("agendamento cadastrado com sucesso!");
    } else {
      atualizaAgendamento(data, id);
      alert("agendamento atualizado com sucesso!");
    }
    navigate("/agendamentos");
  };

  //Caso tenha erro no formulario, mostra mensagens de erro nos campos
  const onError = (errors) => {
    console.log("Erros:", errors);
  };
  return (
    <div className="text-center">
      <Form className="mt-3 w-full" onSubmit={handleSubmit(onSubmit, onError)}>
        <h5 className=" text-start">Dados</h5>
        <Row>
          <Col md={12} lg={6}>
            {/* Select de tipo */}
            <FloatingLabel
              controlId="floatingSelectTipo"
              label="Tipo de de agendamento"
              className="mb-5"
            >
              <Form.Select
                {...register("tipo", {
                  validate: (value) => value !== "0" || "Escolha um tipo",
                })}
              >
                <option value="0"> Escolha uma tipo </option>
                <option value="Consulta"> Consulta </option>
                <option value="Exame"> Exame </option>
                <option value="Vacina"> Vacina </option>
              </Form.Select>
              {errors.tipo && <p className="error">{errors.tipo.message}</p>}
            </FloatingLabel>

            {/* Caixinha de data */}
            <FloatingLabel
              controlId="floatingInputData"
              label="Data"
              className="mb-5"
            >
              <Form.Control
                type="date"
                placeholder="Digite a data do agendamento"
                {...register("data", {
                  required: "Data é obrigatório",
                })}
              />
              {errors.data && <p className="error">{errors.data.message}</p>}
            </FloatingLabel>

            {/* Caixinha de hora */}
            <FloatingLabel
              controlId="floatingInputHora"
              label="Hora"
              className="mb-5"
            >
              <Form.Control
                type="time"
                placeholder="Digite a hora do agendamento"
                {...register("hora", {
                  required: "Hora é obrigatório",
                })}
              />
              {errors.hora && <p className="error">{errors.hora.message}</p>}
            </FloatingLabel>
          </Col>
          <Col md={12} lg={6}>
            {/* Caixinha de responsavel */}
            <FloatingLabel
              controlId="floatingInputResponsavel"
              label="Responsavel"
              className="mb-5"
            >
              <Form.Control
                type="text"
                placeholder="Digite o responsavel do agendamento"
                {...register("responsavel", {
                  required: "Responsavel é obrigatório",
                  minLength: {
                    value: 2,
                    message: "Responsavel deve ter pelo menos 2 caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message: "Responsavel deve ter ate 100 caracteres",
                  },
                })}
              />
              {errors.responsavel && (
                <p className="error">{errors.responsavel.message}</p>
              )}
            </FloatingLabel>
            {/* Select de animal */}
            <FloatingLabel
              controlId="floatingSelectAnimal"
              label="Animal"
              className="mb-5"
            >
              <Form.Select
                {...register("animal", {
                  validate: (value) => value !== "0" || "Escolha um animal",
                })}
              >
                <option value="0"> Escolha um animal </option>
                {animais.map((ani) => (
                  <option
                    key={ani.id}
                    value={ani.nome}
                    defaultValue={
                      props.page === "editar" && watch("animal") === ani.nome
                    }
                  >
                    {ani.nome} ({ani.raca} - {ani.tutor})
                  </option>
                ))}
              </Form.Select>
              {errors.animal && (
                <p className="error">{errors.animal.message}</p>
              )}
            </FloatingLabel>

            {/* Select de status */}
            <FloatingLabel
              controlId="floatingSelectStatus"
              label="Status"
              className="mb-5"
            >
              <Form.Select
                {...register("status", {
                  validate: (value) => value !== "0" || "Escolha um tipo",
                })}
              >
                <option value="0"> Escolha uma tipo </option>
                <option value="Agendado"> Agendado </option>
                {/* {props.page != "cadastro" && (
                  <>
                    <option value="Feito"> Feito </option>
                    <option value="Vencido"> Vencido </option>
                  </>
                )} */}
              </Form.Select>
              {errors.status && (
                <p className="error">{errors.status.message}</p>
              )}
            </FloatingLabel>
          </Col>
        </Row>
        {/* Botão para enviar o formulário de cadastro de produto */}
        <Button variant="primary" size="lg" type="submit">
          {props.page === "editar" ? "Atualizar" : "Cadastrar"}
        </Button>
      </Form>
    </div>
  );
};

export default FormularioAgendamento;
