import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // подключение jest-dom для использования матчеров, как toBeInTheDocument
import AuthForm from "./AuthForm.tsx"; // путь к компоненту AuthForm
import { repoStore } from "../stores/RepoStore";

// Мокаем repoStore для тестирования
jest.mock("../stores/RepoStore", () => ({
  repoStore: {
    setToken: jest.fn(),
  },
}));

describe("AuthForm", () => {
  it("отображает форму с описанием и полем для ввода токена", () => {
    render(<AuthForm />);

    // Проверяем, что описание с информацией о токенах отображается
    expect(screen.getByText(/Ограничения API:/i)).toBeInTheDocument();

    // Проверяем, что поле ввода отображается
    expect(
      screen.getByPlaceholderText("Введите GitHub Personal Access Token")
    ).toBeInTheDocument();

    // Проверяем, что кнопка для отправки формы отображается
    expect(screen.getByText("Установить токен")).toBeInTheDocument();
  });

  it("позволяет пользователю ввести токен", () => {
    render(<AuthForm />);

    const input = screen.getByPlaceholderText(
      "Введите GitHub Personal Access Token"
    ) as HTMLInputElement;

    // Симулируем ввод текста в поле
    fireEvent.change(input, { target: { value: "new_token_value" } });

    // Проверяем, что значение в поле ввода изменилось
    expect(input.value).toBe("new_token_value");
  });

  it("вызывает repoStore.setToken при отправке формы", () => {
    render(<AuthForm />);

    const input = screen.getByPlaceholderText(
      "Введите GitHub Personal Access Token"
    );
    const submitButton = screen.getByText("Установить токен");

    // Симулируем ввод текста в поле
    fireEvent.change(input, { target: { value: "new_token_value" } });

    // Симулируем отправку формы
    fireEvent.click(submitButton);

    // Проверяем, что функция setToken была вызвана с правильным значением токена
    expect(repoStore.setToken).toHaveBeenCalledWith("new_token_value");
  });
});
