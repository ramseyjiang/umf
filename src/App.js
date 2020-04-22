import React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AuthContextProvider from "./contexts/AuthContext";
import UserContextProvider from "./contexts/UserContext";

const App = () => (
  <BrowserRouter>
    <AuthContextProvider>
      <UserContextProvider>
        <Layout />
      </UserContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);

export default App;
