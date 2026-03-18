import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import NavBar from "./Navbar";
import { ConfigProvider } from "antd";
import Cadastro from "./Cadastro";
import TitleBar from "./TitleBar";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "orange" } }}>
      <BrowserRouter>
        <div className="main">
          <TitleBar />
          <Switch>
            {/* SUAS ROTAS VÊM AQUI */}
            <Route path="/" component={Home} exact />
            <Route path="/cadastro" component={Cadastro} exact />

            <Redirect to="/" />
          </Switch>
          <NavBar />
        </div>
      </BrowserRouter>
    </ConfigProvider>
  );
}

root.render(<App />);
