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
      <p>
        <b>Ограничения API:</b> GitHub имеет ограничения на количество запросов,
        которые можно выполнить без аутентификации. С токеном пользователь может
        делать больше запросов, чем без него. Например, без токена разрешено
        делать лишь 60 запросов в час, а с токеном — до 5000 запросов в час.
      </p>
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
