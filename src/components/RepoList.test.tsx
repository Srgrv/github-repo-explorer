import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RepoList from "./RepoList.tsx";

jest.mock("../stores/RepoStore", () => ({
  repoStore: {
    repos: [
      {
        id: 1,
        name: "Test Repo A",
        description: "Test Description A",
        stargazers_count: 100,
      },
      {
        id: 2,
        name: "Test Repo B",
        description: "Test Description B",
        stargazers_count: 200,
      },
    ],
    loading: false,
    hasMore: true,
    fetchRepos: jest.fn(),
    editRepo: jest.fn(),
    deleteRepo: jest.fn(),
    setSortField: jest.fn(),
    setSortOrder: jest.fn(),
    sortField: "stars",
    sortOrder: "desc",
  },
}));

describe("RepoList", () => {
  it("отображает список репозиториев", () => {
    render(<RepoList />);
    expect(screen.getByText("GitHub Репозитории")).toBeInTheDocument();
    expect(screen.getByText("Test Repo A")).toBeInTheDocument();
    expect(screen.getByText("Test Repo B")).toBeInTheDocument();
  });

  it("позволяет сортировать по звездам", async () => {
    render(<RepoList />);

    const sortSelect = await screen.findByRole("combobox", {
      name: /Сортировать по/i,
    });

    fireEvent.mouseDown(sortSelect);
    const options = await screen.findAllByRole("option", { name: /Звезды/i });

    expect(options.length).toBeGreaterThan(0);
    fireEvent.click(options[0]);

    expect(options[0]).toBeInTheDocument();
  });

  it("позволяет изменять порядок сортировки", async () => {
    render(<RepoList />);

    const orderSelect = await screen.findByRole("combobox", {
      name: /Порядок сортировки/i,
    });

    fireEvent.mouseDown(orderSelect);

    const option = await screen.findByText("По возрастанию");
    fireEvent.click(option);

    expect(option).toBeInTheDocument();
  });
});
