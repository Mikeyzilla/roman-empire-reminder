import { useRoutes } from "react-router-dom";
import { appRoutes } from "./App/routes";

function App() {
  const routes = useRoutes(appRoutes);
  return routes;
}

export default App;