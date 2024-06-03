import TodoFactory from "./todos/todo";


const WebController = () => {
    const todoFac = TodoFactory();
    // const domManager = DomFactory();

    todoFac.todoMaker(`1`,`2`,`3`,`4`,`5`,`6`);
    todoFac.todoMaker(`1`,`2`,`3`,`4`,`5`,`6`);
    todoFac.todoMaker(`1`,`2`,`3`,`4`,`5`,`6`);
    todoFac.todoMaker(`1`,`2`,`3`,`4`,`5`,`6`);
    console.log(todoFac.getList());
    todoFac.todoRemover(0);
    console.log(todoFac.getList());





}

const website = WebController();

