import { ThemeProvider } from "styled-components";
import { Navigation } from "components";
import theme from "utils/theme";
import GlobalStyles from "index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <Router>
        <Navigation
          items={[
            { content: "Homepage", to: "/" },
            { content: "Budget", to: "/budget" },
          ]}
        />
        <Switch>
          <Route path="/" exact>
            Homepage
          </Route>
          <Route path="/budget" exact>
            Budget page
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
