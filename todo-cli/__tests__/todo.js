const todo = require("../todo");
const { all, add, markAsComplete, overdue, dueToday, dueLater} = todo();
const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1)),
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1)),
);
describe("TODO test suite-1", () => {
  beforeAll(() => {
    add({
      title: "test todo",
      dueDate: tomorrow,
      completed: false
    });
  });
  test("creating a new todo", () => {
    let lengthBefore = all.length;
    add({
      title: "new todo",
      dueDate: today,
      completed: false
    });
    expect(all.length).toBe(lengthBefore+1);
  });
  test("marking a todo as completed.", () => {
    expect(all[0].completed).toBe(false)
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
});
describe("Test part-2", () => {
  beforeAll(() => {
    add({ title: "Submit assignment", dueDate: yesterday, completed: false });
    add({ title: "Pay rent", dueDate: today, completed: true });
    add({ title: "Service Vehicle", dueDate: today, completed: false });
    add({ title: "File taxes", dueDate: tomorrow, completed: false });
    add({ title: "Pay electric bill", dueDate: tomorrow, completed: false });
  });

  test(" retrieval of overdue items", () => {
    const list = overdue();
    expect(list.length).toBe(1);
  });
  test("retrieval of due today items", () => {
    const list = dueToday();
    expect(list.length).toBe(3);
  });
  test("Dretrieval of due later items", () => {
    const list = dueLater();
    expect(list.length).toBe(3);
  });
})