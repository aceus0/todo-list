import './style.css';
import TodoFactory from "./todos/todo";
import DomManipulator from './dom/dom';


const WebController = () => {
    const newTask = document.getElementById(`new-task`);  

    const todoFac = TodoFactory();
    const domManager = DomManipulator();

    const title = `a`;
    const category = `Daily`;
    const dueDate = `1`;
    const description = `1`;
    let id = 2;
    
    const test = {title, description, dueDate, category, id};

    todoFac.todoMaker(test);

    domManager.renderPage(todoFac.getList, todoFac.todoRemover);

    newTask.addEventListener(`click`, (e) => {
        domManager.newTask(todoFac.todoMaker, todoFac.todoRemover);
            
        });
}

const website = WebController();

