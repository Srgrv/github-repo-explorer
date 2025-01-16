import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

export interface Repo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
}

class RepoStore {
  repos: Repo[] = [];
  page = 1;
  loading = false;
  hasMore = true;
  token: string | null = null;
  sortField: "stars" | "name" = "stars";
  sortOrder: "asc" | "desc" = "desc";

  constructor() {
    makeAutoObservable(this);
  }

  setToken = (token: string) => {
    this.token = token;
  };

  setSortField = (field: "stars" | "name") => {
    this.sortField = field;
    this.repos = [];
    this.page = 1;
    this.hasMore = true;
    this.fetchRepos();
  };

  setSortOrder = (order: "asc" | "desc") => {
    this.sortOrder = order;
    this.repos = [];
    this.page = 1;
    this.hasMore = true;
    this.fetchRepos();
  };

  fetchRepos = async () => {
    if (this.loading || !this.hasMore) return;

    this.loading = true;
    try {
      const headers = this.token
        ? { Authorization: `token ${this.token}` }
        : {};
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=javascript&sort=${this.sortField}&order=${this.sortOrder}&page=${this.page}`,
        { headers }
      );
      runInAction(() => {
        this.repos = [...this.repos, ...response.data.items];
        this.page += 1;
        this.hasMore = response.data.items.length > 0;
      });
    } catch (error) {
      console.error("Error fetching repos:", error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  editRepo = (id: number, updates: Partial<Repo>) => {
    const index = this.repos.findIndex((repo) => repo.id === id);
    if (index !== -1) {
      this.repos[index] = { ...this.repos[index], ...updates };
    }
  };

  deleteRepo = (id: number) => {
    this.repos = this.repos.filter((repo) => repo.id !== id);
  };
}

export const repoStore = new RepoStore();
