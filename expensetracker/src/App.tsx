import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Allroutes from "./Routers/Allroutes";
import AppToaster from "./Components/Toaster";

function App() {
  return (
    <>
      <BrowserRouter>
        <Allroutes />
        <AppToaster />
      </BrowserRouter>
    </>
  );
}

export default App;
