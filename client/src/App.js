import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import List from "./pages/todo";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={List} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
