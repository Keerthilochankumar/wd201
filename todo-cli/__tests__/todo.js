/* eslint-disable no-undef */
const todoList= require("../todo");

const {all, markAsComplete,dueToday,overdue,dueLater, add}= todoList();
describe("todo test suit",()=>{
beforeAll(()=>{
add({
      title: "test todo",
      completed:false,
      dueDate:new Date().toLocaleDateString("en-CA")
 });
})


test("creating a new todo",() =>{
 const todoitemlenght=all.length;
 add({
      title: "test todo",
      completed:false,
      dueDate:new Date().toLocaleDateString("en-CA")
 } 
);
 expect(all.length).toBe(todoitemlenght+1);
});
test("marking a todo as completed.",()=>{
 expect(all[0].completed).toBe(false);
 markAsComplete(0);
 expect(all[0].completed).toBe(true);
})
test("retrieval of overdue items", () => {
    const overduecount= overdue(all).length;
    add({
      title: "work",
      dueDate: "2022-09-17",
      completed: false
    });
    expect(overdue(all).length>overduecount);
  });
  test("retrieval of due today items", () => {
    const duetodaycount= dueToday(all).length;
    add({
      title: "work1",
      dueDate: new Date().toLocaleDateString("en-CA"),
      completed: false
    });
    expect(dueToday(all).length>duetodaycount);
  });
  test("retrieval of due later items", () => {
    const duelatercount= dueLater(all).length;
    add({
      title: "work2",
      dueDate: "2022-09-20",
      completed: false
    });
    expect(dueLater(all).length>duelatercount);
  });
})