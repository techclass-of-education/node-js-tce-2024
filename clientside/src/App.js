import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegisterForm } from "./Pages/RegisterForm";
import { LoginForm } from "./Pages/LoginForm";
import { Home } from "./Home";
import { About } from "./Pages/About";
import { Welcome } from "./Pages/Welcome";
import { UpdateForm } from "./Pages/UpdateForm";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/form/register" element={<RegisterForm />}/>
        <Route path="/form/login" element={<LoginForm />}/>
        <Route path="/form/welcome" element={<Welcome />}/>
        <Route path="/form/udpate" element={<UpdateForm />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
