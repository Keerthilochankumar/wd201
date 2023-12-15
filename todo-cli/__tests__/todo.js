/* eslint-disable no-undef */
const todo = require("../todo");
const { all, add, markAsComplete, overdue, dueToday, dueLater } = todo();
const today =new Date().toLocaleDateString("en-CA");
describe("TODO test suite", () => {
  beforeAll(() => {
    add({
      title: "new todo",
      dueDate: today,
      completed: true,
    });
  });
  test("creating a new todo", () => {
    let lengthBefore = all.length;
    add({
      title: "new todo",
      dueDate: today,
      completed: false,
    });
    expect(all.length).toBe(lengthBefore + 1);
  });
  test("marking a todo as completed", () => {
    all[0].completed = false;
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("retrieval of overdue items", () => {
    expect(overdue(all)).toBeDefined();
  });
  test("retrieval of due today items", () => {
    expect(dueToday(all)).toBeDefined();
  });
  test("Dretrieval of due later items", () => {
    expect(dueLater(all)).toBeDefined();
  });
});