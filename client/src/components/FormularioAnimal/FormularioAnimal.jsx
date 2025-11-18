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

// Importando o hook useInserirAnimal
import {
  useInserirAnimal,
  useBuscarAnimalPorId,
  useAtualizaAnimal,
} from "../../hooks/useAnimais";

import { useListaTutores } from "../../hooks/useTutores";

const FormularioAnimal = (props) => {
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
  // Usando a funcao de inserir Animal vinda do hook
  const { inserirAnimal } = useInserirAnimal();

  // Usando a funcao de buscar Funcionario por id e de atualizar o Funcionario
  const { buscarAnimalPorId } = useBuscarAnimalPorId();
  const { atualizaAnimal } = useAtualizaAnimal();

  // variavel para armazenar os clientes, que veio do hook
  const tutores = useListaTutores();

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
      async function fetchAnimal() {
        try {
          const animal = await buscarAnimalPorId(id);
          // Se houver Funcionario, reseta o formulário com os dados do Funcionario
          if (animal && !carregado) {
            reset({
              id: animal.id,
              nome: animal.nome,
              especie: animal.especie,
              raca: animal.raca,
              sexo: animal.sexo,
              tutor: animal.tutor,
            });
            // Evita chamadas múltiplas de reset
            setCarregado(true);
          }
        } catch (erro) {
          console.error("Erro ao buscar Animal:", erro);
          // Se o erro for de Funcionario não encontrado, redireciona para a página inicial
          if (erro.message.includes("Unexpected")) {
            alert("Animal não encontrado!");
            navigate("/home");
          }
        }
      }
      fetchAnimal();
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
      inserirAnimal(data);
      alert("Animal cadastrado com sucesso!");
    } else {
      atualizaAnimal(data, id);
      alert("Animal atualizado com sucesso!");
    }
    navigate("/animais");
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
          <Col md={12}>
            {/* Caixinha de nome */}
            <FloatingLabel
              controlId="floatingInputNomeCompleto"
              label="Nome Completo"
              className="mb-5"
            >
              <Form.Control
                type="text"
                placeholder="Digite o nome completo do Animal"
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

            {/* Caixinha de Especie */}
            <FloatingLabel
              controlId="floatingInputEspecie"
              label="Especie"
              className="mb-5"
            >
              <Form.Control
                type="text"
                placeholder="Digite a especie do Animal"
                {...register("especie", {
                  required: "Especie é obrigatório",
                  minLength: {
                    value: 2,
                    message: "Especie deve ter pelo menos 2 caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message: "Especie deve ter ate 100 caracteres",
                  },
                })}
              />
              {errors.especie && (
                <p className="error">{errors.especie.message}</p>
              )}
            </FloatingLabel>

            {/* Caixinha de raca */}
            <FloatingLabel
              controlId="floatingInputRaca"
              label="Raca"
              className="mb-5"
            >
              <Form.Control
                type="text"
                placeholder="Digite a raca do Animal"
                {...register("raca", {
                  required: "Raca é obrigatório",
                  minLength: {
                    value: 2,
                    message: "Raca deve ter pelo menos 2 caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message: "Raca deve ter ate 100 caracteres",
                  },
                })}
              />
              {errors.raca && <p className="error">{errors.raca.message}</p>}
            </FloatingLabel>

            {/* Caixinha de sexo */}
            <FloatingLabel
              controlId="floatingInputSexo"
              label="Sexo"
              className="mb-5"
            >
              <Form.Control
                type="text"
                placeholder="Digite o sexo do Animal"
                {...register("sexo", {
                  required: "Sexo é obrigatório",
                  minLength: {
                    value: 2,
                    message: "Sexo deve ter pelo menos 2 caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message: "Sexo deve ter ate 100 caracteres",
                  },
                })}
              />
              {errors.sexo && <p className="error">{errors.sexo.message}</p>}
            </FloatingLabel>
            
            {/* Select de tutor */}
            <FloatingLabel
              controlId="floatingSelectTutor"
              label="Tutor"
              className="mb-5"
            >
              <Form.Select
                {...register("tutor", {
                  validate: (value) => value !== "0" || "Escolha um tutor",
                })}
              >
                <option value="0"> Escolha um tutor </option>
                {tutores.map((tut) => (
                  <option
                    key={tut.id}
                    value={tut.nome}
                    // é pra ser selected, mas tá reclamando
                    defaultValue={
                      props.page === "editar" && watch("categoria") === tut.nome
                    }
                  >
                    {tut.nome}
                  </option>
                ))}
              </Form.Select>
              {errors.tutor && <p className="error">{errors.tutor.message}</p>}
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

export default FormularioAnimal;
