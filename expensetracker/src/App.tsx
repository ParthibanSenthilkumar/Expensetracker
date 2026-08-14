import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Allroutes from "./Routers/Allroutes";
import AppToaster from "./Components/Toaster";
import ProfileProvider from "./Context/ProfileProvider";

function App() {
  return (
    <>
      <BrowserRouter>
      <ProfileProvider>
        <Allroutes />
        <AppToaster />
        </ProfileProvider>
      </BrowserRouter>
  
    </>
  );
}

export default App;
