import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import CartViewPage from "./pages/CartViewPage";
import CreateViewPage from "./pages/CreateViewPage";
import EditViewPage from "./pages/EditViewPage";
import MainViewPage from "./pages/MainViewPage";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={MainViewPage} />
        <Route path="/cart" component={CartViewPage} />
        <Route path="/edit" component={EditViewPage} />
        <Route path="/create" component={CreateViewPage} />
      </Switch>
    </Layout>
  );
};

export default App;
