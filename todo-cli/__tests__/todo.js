const todo = require("../todo");
const { all, add, markAsComplete, overdue, dueToday, dueLater,yesterday,tomorrow } = todo();
const today = new Date()
describe("TODO test suite-1", () => {
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
      title: "new todo",
      dueDate: today.toLocaleDateString("en-CA"),
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
describe("todo test suit-2",()=>{
 beforeAll(() => {
    add({ title: "clear room", dueDate: yesterday, completed: false });
    add({ title: "Pay tax", dueDate: today, completed: true });
    add({ title: "Service car", dueDate: today, completed: false });
    add({ title: "arrange file", dueDate: tomorrow, completed: false });
    add({ title: "Pay electric bill", dueDate: tomorrow, completed: false });
  });
    test(" retrieval of overdue items", () => {
    const list = overdue();
    expect(list.length).toBe(0);
  });
  test("retrieval of due today items", () => {
    const list = dueToday();
    expect(list.length).toBe(2);
  });
  test("Dretrieval of due later items", () => {
    const list = dueLater();
    expect(list.length).toBe(2);
  });
});
