import { render, screen } from "@testing-library/react";
import App from "./App";
import Footer from "./components/Footer";
import Loading from "./components/Loading";


describe("Test cases", () => {

  test("Renders footer with copyright text", () => {
    render(<Footer />);
    expect(screen.getByText("Valtteri Kerttula")).toBeInTheDocument();
  });

  test("Circular loading effect", () => {
    render(<Loading />);
    expect(screen.findAllByTestId('loading')).toBeDefined();
  });

  test("Renders ToDo App container", () => {
    render(<App />);
    expect(screen.findAllByTestId('todo-app-container')).toBeDefined();
  });

  test("Navbar Register / Login buttons", () => {
    render(<App />);
    expect(screen.findAllByTestId('nav-buttons')).toBeDefined();
  });

});
