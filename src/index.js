import './style.css';
import TodoFactory from "./todos/todo";
import DomManipulator from './dom/dom';


const WebController = () => {
    const newTask = document.getElementById(`new-task`);  

    const todoFac = TodoFactory();
    const domManager = DomManipulator();

    newTask.addEventListener(`click`, (e) => {
        let complete = domManager.newTask();
        console.log(complete);
    })







}

const website = WebController();

