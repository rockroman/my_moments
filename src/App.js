import NavBar from "./components/NavBar";
import styles from "./App.module.css";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home page</h1>} />
          <Route exact path="/signin" render={() => <h1>Sign in Page</h1>} />
          <Route exact path="/signup" render={() => <h1>Sign Up Page</h1>} />
          <Route render={() => <h1>Page not found!</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
