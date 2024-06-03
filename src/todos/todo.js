const TodoFactory = () => {
    
    const todoList = [];
    let id = 0;

    const logger = (msg) => {
        console.log(msg);
    }

    class Todo {
        constructor(title, description, dueDate, priority, notes, category) {
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
            this.notes = notes;
            this.category = category;
            this.id = id;
        }
    }

    const todoMaker = (title, description, dueDate, priority, notes, category) => {
        
        const todo = new Todo(title, description, dueDate, priority, notes, category);
        id++;
        todoList.push(todo);
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