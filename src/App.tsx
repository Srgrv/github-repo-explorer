import React from "react";
import { ConfigProvider } from "antd";
import RepoList from "./components/RepoList.tsx";
import AuthForm from "./components/AuthForm.tsx";

const App: React.FC = () => {
  return (
    <ConfigProvider>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        <AuthForm />
        <RepoList />
      </div>
    </ConfigProvider>
  );
};

export default App;
