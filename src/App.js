import { ThemeProvider } from "styled-components";
import { LoadingIndicator, Navigation, Wrapper } from "components";
import theme from "utils/theme";
import GlobalStyles from "index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Suspense } from "react";

function App() {
  const { t, i18n } = useTranslation();
  return (
    <>
      <GlobalStyles />
      <Router>
        <Navigation
          items={[
            { content: t("Homepage"), to: "/" },
            { content: t("Budget"), to: "/budget" },
          ]}
          RightElement={
            <div>
              <button onClick={() => i18n.changeLanguage("pl")}>pl</button>
              <button onClick={() => i18n.changeLanguage("en")}>en</button>
            </div>
          }
        />
        <Wrapper>
          <Switch>
            <Route path="/" exact>
              Homepage
            </Route>
            <Route path="/budget" exact>
              Budget page
            </Route>
          </Switch>
        </Wrapper>
      </Router>
    </>
  );
}

const RootApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<LoadingIndicator />}>
        <App />
      </Suspense>
    </ThemeProvider>
  );
};
export default RootApp;
