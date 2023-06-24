import userEvent from "@testing-library/user-event";
import Login from ".";
import { fireEvent, render, screen } from "@testing-library/react";

describe("<Login/>", () => {
  test("", () => {
    render(<Login />);

    const form = getForm();

    userEvent.clear(form);

    fireEvent.submit(form, {
      target: {
        login: { valeu: "" },
        password: { value: "" },
      },
    });
  });
});
