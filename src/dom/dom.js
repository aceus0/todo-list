
const DomManipulator = () => {
    const content = document.querySelector(`#content`);
    let newItem = null;
    let id = 0;

    let taskWizard = false;

    const storedObj = (data) => {
        newItem = data;
        console.log(`It stored!`);
        return newItem;
    }

    const taskCardBuilder = (taskData, deleteTaskFunc) => {
        const form = document.createElement('form');
        form.setAttribute(`id`, `task-form`);
        form.setAttribute(`class`, `task-form`);
        
        const deleteBtn = document.createElement(`button`);
        deleteBtn.setAttribute(`id`, `delete-button`);
        deleteBtn.textContent = `Delete Task`;
        
        form.innerHTML = 
        `
        <h1>Title: ${taskData.title}</h1>
        <p>Category: ${taskData.category}</p>
        <p>Due Date: ${taskData.dueDate}</p>
        <p>Description: ${taskData.description}</p>
        `;
        content.appendChild(form);

        form.appendChild(deleteBtn);
        deleteBtn.addEventListener(`click`, (e) => {
            e.preventDefault();
            deleteTaskFunc(taskData.id);
            form.remove();
        })
    }

    const renderPage = (getListFunc, todoRemove) => {
        const priority = document.getElementById(`home`)

        const daily = document.getElementById(`daily`);
        const weekly = document.getElementById(`weekly`);
        const monthly = document.getElementById(`monthly`);
        const yearly = document.getElementById(`yearly`);

        let currentPage;

        let taskList = getListFunc();
        console.table(taskList)
        console.log(taskList[0]);

        const taskSorter = (category, list, criteria) => {
            if (currentPage != category) {
                taskWizard = false;
            [...document.getElementsByClassName("task-form")].map(n => n && n.remove());
            [...document.getElementsByClassName("")].map(n => n && n.remove());
            for (let i = list.length - 1; i >=0; --i) {
                if (taskList[i].category === criteria) {
                    taskCardBuilder(taskList[i], todoRemove);
                }
            }
        }
    }

        daily.addEventListener(`click`, (e) => {
            taskSorter(daily, taskList, `Daily`);
            currentPage = daily;
            }
        )

        weekly.addEventListener(`click`, (e) => {
            taskSorter(weekly, taskList, `Weekly`);
            currentPage = weekly;
        }
        )

        monthly.addEventListener(`click`, (e) => {
            taskSorter(monthly, taskList, `Monthly`);
            currentPage = monthly;
        }
        )

        yearly.addEventListener(`click`, (e) => {
            taskSorter(yearly, taskList, `Yearly`);
            currentPage = yearly;
        }
        )
    }

    const newTask = (todoAdd, todoRemove) => {
        if (taskWizard === false){
        taskWizard = true;
        const form = document.createElement('form');
        form.setAttribute(`id`, `task-form`);
        form.setAttribute(`class`, `task-form`);
        form.innerHTML = `
            <h1>New Task</h1>
            <p>
                <label for="title">Title:</label>
                <input type="text" id="title">
            </p>
            <p>
                <label for="category">Category:</label>

                <select name="category" id="category">
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
                </select>
            </p>
            <p>
                <label for="due-date">Due Date:</label>
                <input type="date" id="due-date">
            </p>
            <p>
                <label for="description">Description:</label>
                <textarea id="description" rows="3" cols="50"></textarea>
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
                taskWizard = false;
            } else if (e.target.id === "saveBtn") {
                e.preventDefault();
                const title = document.querySelector('#title').value;
                const category = document.querySelector('#category').value;
                const dueDate = document.querySelector('#due-date').value;
                const description = document.querySelector('#description').value;
                
                form.remove();
                const taskData = {title, description, dueDate, category, id};
                todoAdd(taskData);
                taskCardBuilder(taskData, todoRemove);
                taskWizard = false;

                ++id;
            }
        });
        content.appendChild(form);

    }
    }

    return { 
        newTask,
        storedObj,
        renderPage
         };
}

export default DomManipulator;