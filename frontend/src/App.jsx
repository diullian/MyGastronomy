import NavBar from "./components/navbar/navbar";
import { Outlet } from "react-router-dom";

function App() {
  //const [count, setCount] = useState(0);

  return (
    <>
      <NavBar></NavBar>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
