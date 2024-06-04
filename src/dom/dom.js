
const DomManipulator = () => {
    const content = document.querySelector(`#content`);

    const storedObj = (data) => {
        let newItem = data;
        console.log(`It stored!`);
        console.table(newItem);
        return newItem;
    }

    

    const renderPage = (list) => {
        
    }

    const newTask = (callback) => {
        const form = document.createElement('form');
        form.setAttribute(`id`, `task-form`);
        form.innerHTML = `
            <h1>New Task</h1>
            <p>
                <label for="title">Title:</label>
                <input type="text" id="title">
            </p>
            <p>
                <label for="category">Category:</label>
                <input type="text" id="category">
            </p>
            <p>
                <label for="due-date">Due Date:</label>
                <input type="date" id="due-date">
            </p>
            <p>
                <label for="description">Description:</label>
                <input type="text" id="description">
            </p>
            <div>
                <button id="cancelBtn" value="cancel" formmethod="dialog">Cancel</button>
                <button id="saveBtn" value="default">save</button>
            </div>
        `;
        form.addEventListener('click', (e) => {
            if (e.target.id === "cancelBtn"){
                e.preventDefault();
                form.remove();
            } else if (e.target.id === "saveBtn") {
                e.preventDefault();
                const title = document.querySelector('#title').value;
                const category = document.querySelector('#category').value;
                const dueDate = document.querySelector('#due-date').value;
                const description = document.querySelector('#description').value;
                
                const deleteBtn = document.createElement(`button`);
                deleteBtn.setAttribute(`id`, `delete-button`);
                deleteBtn.textContent = `Delete Task`
                
                form.innerHTML = `
                <h1>Title: ${title}</h1>
                <p>Category: ${category}</p>
                <p>Due Date: ${dueDate}</p>
                <p>Description: ${description}</p>`;

                const taskData = {title, description, dueDate, category};
                callback(taskData);

                form.appendChild(deleteBtn);
                deleteBtn.addEventListener(`click`, (e) => {
                    e.preventDefault();
                    form.remove();
                })
                
            }
        });
        content.appendChild(form);
    }

    return { 
        newTask,
        storedObj
         };
}

export default DomManipulator;