import React, { useState } from "react";
import { Input, Button } from "antd";
import { repoStore } from "../stores/RepoStore";
import styles from "./AuthForm.module.css";

const AuthForm: React.FC = () => {
  const [token, setToken] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    repoStore.setToken(token);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.authForm}>
      <Input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Введите GitHub Personal Access Token"
      />
      <Button type="primary" htmlType="submit">
        Установить токен
      </Button>
    </form>
  );
};

export default AuthForm;
