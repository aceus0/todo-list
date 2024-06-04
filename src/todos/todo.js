const TodoFactory = () => {
    
    const todoList = [];
    let id = 0;

    const logger = (msg) => {
        console.log(msg);
    }

    class Todo {
        constructor(title, description, dueDate, category) {
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.category = category;
            this.id = id;
        }
    }

    const todoMaker = (object) => {
        console.table(object);
        const todo = new Todo(object.title, object.description, object.dueDate, object.category);
        id++;
        todoList.push(todo);
        console.log(todo);
        logger(`Item added to list.`)

    }

    const todoRemover = (removeId) => {
        
        for (let i = todoList.length - 1; i >=0; --i) {
            if (todoList[i].id === removeId) {
                todoList.splice(i,1);
            }
        }
        logger(`Item Removed.`);
    }

    const getList = () => {
        logger(`List retrieved.`);
        return todoList;
    }

    return { todoMaker, getList, todoRemover };
}

export default TodoFactory;