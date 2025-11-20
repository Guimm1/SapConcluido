// Importando o css da barra de navegação
import styles from "./BarraNavegacao.module.css";

// Importar os componentes do bootstrap
import { Nav, Navbar, NavDropdown, Image, Accordion } from "react-bootstrap";

// Importando os links do router
import { NavLink } from "react-router-dom";

// Importar as informações do contexto autenticação de usuário
import { AuthContext } from "../../contexts/UserContext.jsx";
import { useContext } from "react";

import { IoIosHammer } from "react-icons/io";

// Importanto os icones
import {
  BsBoxes,
  BsBuilding,
  BsBuildingAdd,
  BsBuildingGear,
  BsHouse,
  BsPeople,
  BsPersonAdd,
  BsPersonGear,
  BsPlusCircle,
  BsShop,
  BsSpeedometer,
  BsTable,
  BsViewStacked,
  
} from "react-icons/bs";

import { MdPets } from "react-icons/md";


const BarraNavegacao = () => {
  // importar o nome de usuario logado e funcao logout
  const { usuarioNome, logout } = useContext(AuthContext);

  // Guarda o id do usuário atual
  const idAtual = localStorage.getItem("id");

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark min-vh-100 max-vh-100"
      style={{ width: "300px" }}
    >
      {/* Logo da empresa */}
      <Navbar.Brand as={NavLink} to="/home" className="text-white mb-3 d-flex justify-content-center align-items-center">
        <BsShop className="fs-1" />
        <span className="fs-2 ms-2" >BrasilFix</span>
      </Navbar.Brand>

      {/* Opções de menu */}
      <Nav className="flex-column mb-auto">
        {/* Opção home */}
        <Nav.Link as={NavLink} to="/home" className="text-white px-2">
          <BsHouse className="fs-2" />
          <span className="fs-5 ms-2">Home</span>
        </Nav.Link>    

        {/* Criando o arcordeon */}
        <Accordion flush className="flex-column mb-auto" alwaysOpen>
          {/* Páginas produtos */}
          <Accordion.Item eventKey="0" className="bg-dark text-white">
            <Accordion.Header className={styles.accordionHeader}>
              <IoIosHammer className="fs-2" />
              <span className="ms-2 fs-5 fs-5"> Produtos </span>
            </Accordion.Header>
            <Accordion.Body className={`p-0 bg-dark ${styles.accordionBody}`}>
              <Nav className="flex-column">
                {/* Opção 1 */}
                <Nav.Link
                  as={NavLink}
                  to="/animais"
                  className="text-white ps-4"
                >
                  <BsViewStacked className="fs-5" />
                  <span className="ms-2 fs-5 fs-5"> Listar </span>
                </Nav.Link>
                {/* Opção 2 */}
                <Nav.Link
                  as={NavLink}
                  to="/animais/cadastrar"
                  className="text-white ps-4"
                >
                  <BsPlusCircle className="fs-5" />
                  <span className="ms-2 fs-5 fs-5"> Adicionar </span>
                </Nav.Link>
              </Nav>
            </Accordion.Body>
          </Accordion.Item>
          {/* fim produtos */}

          {/* Páginas cliente */}
          <Accordion.Item eventKey="1" className="bg-dark text-white" >
            <Accordion.Header className={styles.accordionHeader}>
              <BsPeople className="fs-2" />
              <span className="ms-2 fs-5 fs-5">Estoque</span>
            </Accordion.Header>
            <Accordion.Body className={`p-0 bg-dark ${styles.accordionBody}`}>
              <Nav className="flex-column">
                {/* Opção 1 */}
                <Nav.Link
                  as={NavLink}
                  to="/tutores"
                  className="text-white ps-4"
                >
                  <BsPersonGear className="fs-5" />
                  <span className="ms-2 fs-5"> Listar </span>
                </Nav.Link>
                {/* Opção 2 */}
                <Nav.Link
                  as={NavLink}
                  to="/tutores/cadastrar"
                  className="text-white ps-4"
                >
                  <BsPersonAdd className="fs-5" />
                  <span className="ms-2 fs-5"> Adicionar </span>
                </Nav.Link>
              </Nav>
            </Accordion.Body>
          </Accordion.Item>
          {/* fim cliente */}

         
          {/* Páginas Agendamentos */}
          
          {/* fim funcionarios */}
        </Accordion>
      </Nav>

      <hr className=" border-secondary"/>

      {/* Visualizar foto e nome do perfil, e opções */}
      <Nav className=" dropdown pb-4">
        <NavDropdown
          title={
            <span className="text-white align-items-center">
              Usuário: {usuarioNome}
            </span> 
          }
          menuVariant="dark">
          {/* Voltar pra tela de login */}
          <NavDropdown.Item as={NavLink} to="/login" onClick={logout}>
            Sair
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </div>
  );
};

export default BarraNavegacao;
