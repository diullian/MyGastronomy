import NavBar from "./components/navbar/navbar";
import { Outlet } from "react-router-dom";

function App() {
  //const [count, setCount] = useState(0);

  return (
    <>
      <NavBar></NavBar>
      <Outlet />
    </>
  );
}

export default App;
