
const DomManipulator = () => {
    const content = document.querySelector(`#content`);
    let newItem = null;
    let id = 0;
    let currentPage;

    let taskWizard = false;

    const storedObj = (data) => {
        newItem = data;
        console.log(`It stored!`);
        return newItem;
    }

    const taskCardBuilder = (taskData, deleteTaskFunc, todoAdd) => {
        if (taskData.category != currentPage.id) {
            if (taskData.priority != `Yes`) {
                return;
            }
        }
        console.log(`was called!!!`);

        const form = document.createElement('form');
        form.setAttribute(`id`, `task-form`);
        form.setAttribute(`class`, `todo`);

        const wrapper = document.createElement('div');
        wrapper.setAttribute(`class`, `todo-wrapper`);

        const modifyBtn = document.createElement(`button`);
        modifyBtn.setAttribute(`id`, `modify-button`);
        modifyBtn.textContent = `Edit Task`;
        
        const deleteBtn = document.createElement(`button`);
        deleteBtn.setAttribute(`id`, `delete-button`);
        deleteBtn.textContent = `Delete Task`; 
        
        wrapper.innerHTML = 
        `
        <h1>Title: ${taskData.title}</h1>
        <p>Priority: ${taskData.priority}</p>
        <p>Category: ${taskData.category}</p>
        <p>Due Date: ${taskData.dueDate}</p>
        <p>Description: ${taskData.description}</p>
        `;

        form.appendChild(wrapper);
        content.appendChild(form);
        wrapper.appendChild(deleteBtn);

        deleteBtn.addEventListener(`click`, (e) => {
            e.preventDefault();
            deleteTaskFunc(taskData.id);
            form.remove();
        })

        wrapper.appendChild(modifyBtn);
        modifyBtn.addEventListener(`click`, (e) => {
            e.preventDefault();
            form.remove();
            modifyTask(taskData, deleteTaskFunc, todoAdd);
        })
    }

    const renderPage = (getListFunc, todoRemove, todoAdd, firstRun) => {
        firstRun = firstRun || 0;

        const priority = document.getElementById(`Priority`)

        const daily = document.getElementById(`Daily`);
        const weekly = document.getElementById(`Weekly`);
        const monthly = document.getElementById(`Monthly`);
        const yearly = document.getElementById(`Yearly`);


        let taskList = getListFunc();
        console.table(taskList)
        console.log(taskList[0]);

        const taskSorter = (category, list, criteria, mode) => {
            currentPage.style.color = `red`;
            if (currentPage.id == category) {
                taskWizard = false;
            [...document.getElementsByClassName("todo")].map(n => n && n.remove());
            [...document.getElementsByClassName("")].map(n => n && n.remove());
            
            switch(mode) {

            case mode = 1:
                
                for (let i = list.length - 1; i >=0; --i) {    
                    if (taskList[i].priority === `Yes`) {
                        taskCardBuilder(taskList[i], todoRemove, todoAdd);
                    }
                }
                break;

            case mode = 2:
                for (let i = list.length - 1; i >=0; --i) {    
                    if (taskList[i].category === criteria) {
                        taskCardBuilder(taskList[i], todoRemove, todoAdd);
                    }
                }
                break;

            }
            
        }
    }


        if (firstRun === 1) {
            currentPage = priority;
            taskSorter(priority.id, taskList, `Priority`, 1);
            firstRun = 0;
            console.log(currentPage.id);
        }

        priority.addEventListener(`click`, (e) => {
            currentPage.style.color = `white`;
            currentPage = priority;
            taskSorter(priority.id, taskList, `Priority`, 1);
            console.log(currentPage.id);
            }
        )

        daily.addEventListener(`click`, (e) => {
            currentPage.style.color = `white`;
            currentPage = daily;
            taskSorter(daily.id, taskList, `Daily`, 2);
            console.log(currentPage.id);
            }
        )

        weekly.addEventListener(`click`, (e) => {
            currentPage.style.color = `white`;
            currentPage = weekly;
            taskSorter(weekly.id, taskList, `Weekly`, 2);
            console.log(currentPage.id);
        }
        )

        monthly.addEventListener(`click`, (e) => {
            currentPage.style.color = `white`;
            currentPage = monthly;
            taskSorter(monthly.id, taskList, `Monthly`, 2);
            console.log(currentPage.id);
        }
        )

        yearly.addEventListener(`click`, (e) => {
            currentPage.style.color = `white`;
            currentPage = yearly;
            taskSorter(yearly.id, taskList, `Yearly`, 2);
            console.log(currentPage.id);
        }
        )
    }

    const newTask = (todoAdd, todoRemove) => {
        let taskData;

        if (taskWizard === false){
        taskWizard = true;
        const form = document.createElement('form');
        form.setAttribute(`id`, `task-form`);
        form.setAttribute(`class`, `task-form`);
        form.innerHTML = `
        <div class="form-create">
            <h1>New Task</h1>
            <p>
                <label for="title">Title:</label>
                <input type="text" id="title" style="width 25px">
            </p>
            <p>
                <label for="priority">Priority:</label>
                <input type="checkbox" id="priority">
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
                <textarea id="description" style="display:flex;"></textarea>
            </p>
            <div>
                <button id="cancelBtn" value="cancel" formmethod="dialog">Cancel</button>
                <button id="saveBtn" value="default">save</button>
            </div>
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
                
                let priority = document.querySelector('#priority').checked;

                console.log(priority);

                if (priority != true) {
                    priority = `No`;
                } else {
                    priority = `Yes`;
                }

                form.remove();
                taskData = {title, description, dueDate, category, priority, id};
                todoAdd(taskData);

                taskCardBuilder(taskData, todoRemove, todoAdd);
                taskWizard = false;

                ++id;
            }
        });
        content.appendChild(form);

    }
    }

    const modifyTask = (task, todoRemove, todoAdd) => {
        const form = document.createElement('form');
        form.setAttribute(`id`, `task-form`);
        form.setAttribute(`class`, `task-form`);
        let taskPriority;
        if (task.priority === `Yes`){
            taskPriority = "checked";
        } else {
            taskPriority = null;
        }


        form.innerHTML = `
            <h1>New Task</h1>
            <p>
            <label for="title">Title:</label>
            <input type="text" id="title" value="${task.title}">
            </p>
            <p>
            <label for="priority">Priority:</label>
            <input type="checkbox" id="priority" ${taskPriority}>
            </p>
            <p>
            <label for="category">Category:</label>

            <select name="category" id="category" value="${task.category}">
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
            </select>
            </p>
            <p>
            <label for="due-date">Due Date:</label>
            <input type="date" id="due-date" value="${task.dueDate}">
            </p>
            <p>
            <label for="description">Description:</label>
            <textarea id="description" rows="3" cols="50">${task.description}</textarea>
            </p>
            <div>
            <button id="saveBtn" value="default">save</button>
            </div>
        `;
        todoRemove(task.id);
        
        form.addEventListener('click', (e) => {
                if (e.target.id === "saveBtn") {
                    e.preventDefault();
                    const title = document.querySelector('#title').value;
                    const category = document.querySelector('#category').value;
                    const dueDate = document.querySelector('#due-date').value;
                    const description = document.querySelector('#description').value;
                    let priority = document.querySelector('#priority').checked;

                    if (priority != true) {
                        priority = `No`;
                    } else {
                        priority = `Yes`;
                    }
                    console.log(priority)
                    
                    form.remove();
                    const taskData = {title, description, dueDate, category, priority, id};
                    todoAdd(taskData);
                    taskCardBuilder(taskData, todoRemove, todoAdd);
                    taskWizard = false;

                    ++id;
            }
        });
        content.appendChild(form);
    }

    return { 
        newTask,
        storedObj,
        renderPage
         };
}

export default DomManipulator;