# Todo-CLI Application

## Features
- Add new tasks with descriptions.
- Update existing tasks by ID.
- Delete tasks by ID.
- List all tasks.
- Change the status of a task.
- Filter tasks by status.

## Usage
Run the app using the following commands:
0. **clone repo**
   ```bash
   git clone https://github.com/SyedMuzamilShah/Task-Tracker
   ```
1. **Add a Task**
   ```bash
   node app.js add [description]
   ```
   ***Example:***
    ```bash
      node app.js add "Complete the project documentation"
    ```

2. **Update a Task**
    ```bash
    node app.js update <task_id> <new_description>
    ```
    ***Example:***
    ```bash
    node app.js update 1 "Update the project README"
    ```
3. **Delete a Task**
    ```bash
    node app.js delete <task_id>
    ```
    ***Example:***
    ```bash
    node app.js delete <task_id>
    ```
4. **List All Tasks**
    ```bash
    node app.js list
    ```
5. **Change Task Status**
    ```bash
    node app.js changestatus <task_id> <status>
    ```
    - Status options: `just_add`, `in_progress`, `done`.
 
   ***Example:***
    ```bash
    node app.js changestatus 1 done
   ```
6. **List Tasks by Status**
    ```bash
    node app.js readstatus <status>
   ```
    ***Example:***
    ```bash
    node app.js readstatus done
    ```