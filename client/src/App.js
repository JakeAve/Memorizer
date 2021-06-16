import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./views/Register";
import Login from "./views/Login";
import Home from "./views/Home/Home";
import { UserProvider } from "./contexts/user";
import { AlertProvider } from "./contexts/alerts";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <UserProvider>
        <AlertProvider>
          <Nav />
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/new" component={Home} />
            <Route path="/item/:scriptId" component={Home} />
            <Route path="/" component={Home} />
          </Switch>
        </AlertProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
