import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import List from "./pages/todo";
import Login from "./pages/login";
import Register from "./pages/register";
import Analysis from "./pages/analysis";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/analyse" component={Analysis} />
          <Route path="/" exact component={List} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
