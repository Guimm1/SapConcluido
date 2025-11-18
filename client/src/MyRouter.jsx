import { createBrowserRouter } from "react-router-dom";

//Importação das páginas
import App from "./App.jsx";
import RotasProtegidas from "./pages/RotasProtegidas.jsx";
import PaginaErro from "./pages/PaginaErro.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";

// Páginas animais
import CadastrarAnimal from "./pages/Animais/CadastrarAnimal.jsx";
import EditarAnimal from "./pages/Animais/EditarAnimal.jsx";
import VerAnimais from "./pages/Animais/VerAnimais.jsx";

// Páginas Tutores
import CadastrarTutor from "./pages/Tutores/CadastrarTutor.jsx";
import EditarTutor from "./pages/Tutores/EditarTutor.jsx";
import VerTutores from "./pages/Tutores/VerTutores.jsx";

//Páginas pedidos
import CadastrarAgendamento from "./pages/Agendamentos/CadastrarAgendamento.jsx";
import EditarAgendamento from "./pages/Agendamentos/EditarAgendamento.jsx";
import VerAgendamentos from "./pages/Agendamentos/VerAgendamentos.jsx";

const router = createBrowserRouter([
   {
    path: "/",
    element: <App />,
    errorElement: <PaginaErro />,
    children: [
      {
        index:true,
        element:<Login />
      },
      {
        path: "login",
        element: <Login />,
      }
    ],
  },
  {
    path: "/",
    element: <RotasProtegidas />,
    errorElement: <PaginaErro />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "animais",
        children: [
          {
            index: true,
            element: <VerAnimais />,
          },
          {
            path: "cadastrar",
            element: <CadastrarAnimal />,
          },
          {
            path: "editar/:id",
            element: <EditarAnimal />,
          },
        ],
      },
      {
        path: "tutores",
        children: [
          {
            index: true,
            element: <VerTutores />,
          },
          {
            path: "cadastrar",
            element: <CadastrarTutor />,
          },
          {
            path: "editar/:id",
            element: <EditarTutor />,
          },
        ],
      },
      {
        path: "agendamentos",
        children: [
          {
            index: true,
            element: <VerAgendamentos />,
          },
          {
            path: "cadastrar",
            element: <CadastrarAgendamento />,
          },
          {
            path: "editar/:id",
            element: <EditarAgendamento />,
          },
        ],
      },
    ],
  },
]);

export default router;
