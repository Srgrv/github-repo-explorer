import React, { useEffect, useRef, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { List, Card, Button, Spin, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { repoStore, Repo } from "../stores/RepoStore";
import styles from "./RepoList.module.css";

const { Option } = Select;

const RepoList: React.FC = observer(() => {
  const {
    repos,
    loading,
    hasMore,
    fetchRepos,
    editRepo,
    deleteRepo,
    setSortField,
    setSortOrder,
    sortField,
    sortOrder,
  } = repoStore;

  const observer = useRef<IntersectionObserver | null>(null);
  const lastRepoElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchRepos();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    fetchRepos();
  }, []);

  const handleEdit = (repo: Repo) => {
    const newName = prompt("Введите новое имя:", repo.name);
    if (newName) {
      editRepo(repo.id, { name: newName });
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Вы уверены, что хотите удалить этот репозиторий?")) {
      deleteRepo(id);
    }
  };

  return (
    <div className={styles.repoList}>
      <h1>GitHub Репозитории</h1>
      <div className={styles.sortControls}>
        <Select
          defaultValue={sortField}
          aria-label="Сортировать по"
          style={{ width: 120 }}
          onChange={(value: "stars" | "name") => setSortField(value)}
        >
          <Option value="stars" role="option">
            Звезды
          </Option>
          <Option value="name" role="option">
            Имя
          </Option>
        </Select>
        <Select
          defaultValue={sortOrder}
          aria-label="Порядок сортировки"
          style={{ width: 120 }}
          onChange={(value: "asc" | "desc") => setSortOrder(value)}
        >
          <Option value="asc" role="option">
            По возрастанию
          </Option>
          <Option value="desc" role="option">
            По убыванию
          </Option>
        </Select>
      </div>
      <List
        dataSource={repos}
        renderItem={(repo, index) => (
          <List.Item
            ref={index === repos.length - 1 ? lastRepoElementRef : null}
            key={repo.id}
          >
            <Card
              title={repo.name}
              extra={
                <>
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(repo)}
                  />
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(repo.id)}
                  />
                </>
              }
            >
              <p>{repo.description}</p>
              <p>Звезды: {repo.stargazers_count}</p>
            </Card>
          </List.Item>
        )}
      />
      {loading && <Spin className={styles.spinner} />}
    </div>
  );
});

export default RepoList;
