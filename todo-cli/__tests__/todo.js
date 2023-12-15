/* eslint-disable no-undef */
const todo = require("../todo");
const { all, add, markAsComplete, overdue, dueToday, dueLater } = todo();
const today = new Date()
describe("TODO test suite", () => {
  beforeAll(() => {
    add({
      title: "test todo",
      dueDate: today.toLocaleDateString("en-CA"),
      completed: false
    });
  });
  test("creating a new todo", () => {
    let lengthBefore = all.length;
    add({
      title: "Eat",
      dueDate: today.toLocaleDateString("en-CA"),
      completed: false
    });
    expect(all.length).toBe(lengthBefore + 1);
  });
  test("marking a todo as completed.", () => {
    expect(all[0].completed).toBe(false)
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("retrieval of overdue items", () => {
    const overduecount= overdue(all).length;
    add({
      title: "work-0",
      dueDate: "2022-09-17",
      completed: false
    });
    expect(overdue(all).length>overduecount);
  });
  test("retrieval of due today items", () => {
    const duetodaycount= dueToday(all).length;
    add({
      title: "work-1",
      dueDate: today.toLocaleDateString("en-CA"),
      completed: false
    });
    expect(dueToday(all).length>duetodaycount);
  });
  test("retrieval of due later items", () => {
    const duelatercount= dueLater(all).length;
    add({
      title: "work-2",
      dueDate: "2022-09-20",
      completed: false
    });
    expect(dueLater(all).length>duelatercount);
  });
});