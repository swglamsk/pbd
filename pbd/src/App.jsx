import { LoginPage } from "./Pages/LoginPage";
import { BrowserRouter, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
        <Route exact path ="/" component={LoginPage}/>
    </BrowserRouter>
  );
}

export default App;
