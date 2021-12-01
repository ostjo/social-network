import BioEditor from "./bio-editor.js";
import { render, fireEvent, waitFor } from "@testing-library/react";

test("Renders correctly when NO prop is passed", () => {
    const { container } = render(<BioEditor />);
    expect(container.querySelector("button").innerHTML).toBe("add bio");
});

test("Render correctly when prop is passed", () => {
    const { container } = render(<BioEditor bio="This is my bio" />);
    expect(container.querySelector("button").innerHTML).toBe("edit bio");
});

test("Clicking the ‘add’ button causes a textarea and a ‘save’ button to be rendered", () => {
    const { container } = render(<BioEditor />);
    fireEvent.click(container.querySelector("button"));
    expect(container.querySelector("button").innerHTML).toBe("save");
    expect(container.querySelector("textarea")).toBeTruthy();
});

test("Clicking the ‘edit’ button causes a textarea and a ‘save’ button to be rendered", () => {
    const { container } = render(<BioEditor bio="This is my bio" />);
    fireEvent.click(container.querySelector("button"));
    expect(container.querySelector("button").innerHTML).toBe("save");
    expect(container.querySelector("textarea")).toBeTruthy();
});

test("Clicking the ‘Save’ button causes an HTTP request", async () => {
    // set up a mock for fetch requests (does not trigger any fetch, just specifies the mock)
    fetch.mockResolvedValueOnce({
        async json() {
            return {
                bio: mockBio,
            };
        },
    });

    let mockBio = "";

    // mocking the updateInput function
    const mockUpdateBio = jest.fn((bio) => {
        mockBio = bio;
    });

    const { container } = render(
        <BioEditor bio={mockBio} updateBio={mockUpdateBio} />
    );
    // 1. click add button to make textarea appear
    fireEvent.click(container.querySelector("button"));
    // 2. trigger change event
    fireEvent.change(container.querySelector("textarea"), {
        target: { value: "I AM SHOUTING" },
    });
    // 3. click save button to start http request
    fireEvent.click(container.querySelector("button"));
    // 4. fetch is starting

    await waitFor(() => {
        expect(container.querySelector("button").innerHTML).toBe("edit bio");
        expect(container.querySelector("p").innerHTML).toBe("I AM SHOUTING");
    });
});
