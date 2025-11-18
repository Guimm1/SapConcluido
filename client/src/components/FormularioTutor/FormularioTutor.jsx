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

// Importando o hook useInserirCliente
import {
  useInserirTutor,
  useBuscarTutorPorId,
  useAtualizaTutor,
} from "../../hooks/useTutores";

const FormularioTutor = (props) => {
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
  // Usando a funcao de inserir Cliente vinda do hook
  const { inserirTutor } = useInserirTutor();

  // Usando a funcao de buscar Funcionario por id e de atualizar o Funcionario
  const { buscarTutorPorId } = useBuscarTutorPorId();
  const { atualizaTutor } = useAtualizaTutor();

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
      async function fetchTutor() {
        try {
          const tutor = await buscarTutorPorId(id);
          // Se houver Funcionario, reseta o formulário com os dados do Funcionario
          if (tutor && !carregado) {
            reset({
              id: tutor.id,
              nome: tutor.nome,
              email: tutor.email,
              cpf: tutor.cpf,
              telefone: tutor.telefone,
            });
            // Evita chamadas múltiplas de reset
            setCarregado(true);
          }
        } catch (erro) {
          console.error("Erro ao buscar tutor:", erro);
          // Se o erro for de Funcionario não encontrado, redireciona para a página inicial
          if (erro.message.includes("Unexpected")) {
            alert("tutor não encontrado!");
            navigate("/home");
          }
        }
      }
      fetchTutor();
    }, []);
  }

  // FUNCOES QUE LIDAM COM O SUCESSO E ERRO DO FORMULÁRIO
  // funcao pra caso de sucesso na validacao do formulario
  // data é o objeto com os campos do formulário
  const onSubmit = (data) => {
    data.status = "Ativo";
    console.log("Dados:", data);
    if (props.page === "cadastro") {
      // Envia o objeto data para o hook inserir o produto
      inserirTutor(data);
      alert("Tutor cadastrado com sucesso!");
    } else {
      atualizaTutor(data, id);
      alert("Tutor atualizado com sucesso!");
    }
    navigate("/tutores");
  };

  //Caso tenha erro no formulario, mostra mensagens de erro nos campos
  const onError = (errors) => {
    console.log("Erros:", errors);
  };
  return (
    <div className="text-center">
      <Form className="mt-3 w-full" onSubmit={handleSubmit(onSubmit, onError)}>
        <h5 className=" text-start">Dados pessoais</h5>
        <Row>
          <Col md={12}>
            {/* Caixinha de nome */}
            <FloatingLabel
              controlId="floatingInputNomeCompleto"
              label="Nome Completo"
              className="mb-5"
            >
              <Form.Control
                type="text"
                placeholder="Digite o nome completo do cliente"
                {...register("nome", {
                  required: "O nome é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O nome deve ter pelo menos 2 caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message: "O nome deve ter ate 100 caracteres",
                  },
                })}
              />
              {errors.nome && <p className="error">{errors.nome.message}</p>}
            </FloatingLabel>

            {/* Caixinha de email */}
            <FloatingLabel
              controlId="floatingInput"
              label="Email"
              className="mb-5"
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                {...register("email", {
                  required: "O email é obrigatório",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Email inválido",
                  },
                  validate: (value) => value.includes("@") || "Email inválido",
                })}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </FloatingLabel>

            {/* Caixinha de cpf */}
            <FloatingLabel
              controlId="floatingInputcpf"
              label="N° cpf"
              className="mb-5"
            >
              <Form.Control
                type="text"
                placeholder="Digite o número do cpf"
                {...register("cpf", {
                  required: "O número do cpf é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O número do cpf deve ter pelo menos 2 caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message: "O número do cpf deve ter ate 100 caracteres",
                  },
                })}
              />
              {errors.cpf && <p className="error">{errors.cpf.message}</p>}
            </FloatingLabel>

            {/* Caixinha de telefone */}
            <FloatingLabel
              controlId="floatingInputTelefone"
              label="Telefone"
              className="mb-5"
            >
              <Form.Control
                type="text"
                placeholder="Digite a telefone do produto"
                {...register("telefone", {
                  required: "O telefone é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O telefone deve ter pelo menos 2 caracteres",
                  },
                  maxLength: {
                    value: 180,
                    message: "O telefone deve ter ate 180 caracteres",
                  },
                })}
              />
              {errors.telefone && (
                <p className="error">{errors.telefone.message}</p>
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

export default FormularioTutor;
