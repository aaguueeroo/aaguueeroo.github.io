type ChoreState = "pending" | "done";

const NEXT_STATE: Record<string, ChoreState> = { done: "done", undo: "pending" };

export const initChoreDemo = (root: ParentNode = document) => {
  const demo = root.querySelector<HTMLElement>("[data-chore-demo]");
  if (!demo) return;

  const buttons = demo.querySelectorAll<HTMLButtonElement>("[data-chore-action]");
  const events = demo.querySelectorAll<HTMLElement>("[data-chore-event]");

  const show = (state: ChoreState) => {
    demo.dataset.state = state;
    buttons.forEach((button) => {
      button.hidden = button.dataset.choreAction === "done" ? state === "done" : state === "pending";
    });
    events.forEach((event) => {
      event.hidden = state === "pending";
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      show(NEXT_STATE[button.dataset.choreAction ?? "undo"]);
      demo.querySelector<HTMLButtonElement>("[data-chore-action]:not([hidden])")?.focus();
    });
  });

  show("pending");
};
