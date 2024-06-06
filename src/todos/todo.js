const TodoFactory = () => {
    
    let todoList = JSON.parse(localStorage.getItem(`todoStorage`));
    
    console.log(todoList); 

    if (todoList === null){
        todoList = [];
    }

    const logger = (msg) => {
        console.log(msg);
    }

    class Todo {
        constructor(title, description, dueDate, category, priority, id) {
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.category = category;
            this.priority = priority;
            this.id = id;
        }

    }

    const todoStore = () => {
        localStorage.setItem(`todoStorage`, JSON.stringify(todoList));
        console.log(`Modified todo list stored locally.`)
    }


    const todoMaker = (object) => {
        const todo = new Todo(object.title, object.description, object.dueDate, object.category, object.priority, object.id); 
        todoList.push(todo);
        console.log(todo);
        todoStore();
        logger(`Item added to list.`)
    }

    const todoRemover = (removeId) => {
        
        console.log(removeId);
        for (let i = todoList.length - 1; i >=0; --i) {
            if (todoList[i].id === removeId) {
                todoList.splice(i,1);
            }
        }
        logger(`Item Removed.`);
        todoStore();
        console.table(todoList);
    }

    const getList = () => {
        logger(`List retrieved.`);
        return todoList;
    }

    return { todoMaker, getList, todoRemover };
}

export default TodoFactory;