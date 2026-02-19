import NavBar from "./components/navbar/navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/footer.jsx";

function App() {
  //const [count, setCount] = useState(0);

  return (
    <>
      <NavBar></NavBar>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
