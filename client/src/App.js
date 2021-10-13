import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import List from "./pages/todo";
import Login from "./pages/login";
import Register from "./pages/register";
import Analysis from "./pages/analysis";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div>
      <Helmet>
        <title>TODO APP</title>
        <meta
          name="todo list"
          content="App with detailed analysis of tasks performed"
        />
      </Helmet>
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
    </div>
  );
}

export default App;
