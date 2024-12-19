#!/usr/bin/env node

import fs from "fs";

const fileName = "task.json";
const preDefinedStatus = ["just_add", "in_progress", "done"];
const currentTime = new Date();

// Utility to check file existence
const checkFileExistence = () => fs.existsSync(fileName);

// Utility to read data from the file
const readFile = () => {
  try {
    if (!checkFileExistence()) return [];
    const data = fs.readFileSync(fileName, "utf-8");
    return JSON.parse(data) || [];
  } catch (error) {
    console.error("Error reading or parsing the file:", error);
    return [];
  }
};


// Utility to write data to the file
const writeFile = (data) => {
  try {
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to file:", error);
  }
};

// Add a new task
const addTask = (description) => {
  if (!description) {
    console.log("Description cannot be empty!");
    return;
  }

  const tasks = readFile();
  const newTask = {
    id: `${tasks.length + 1}`,
    description,
    status: "just_add",
    created_at: currentTime,
    updated_at: "",
  };

  tasks.push(newTask);
  writeFile(tasks);
  console.log(`Task added successfully! Task ID: ${newTask.id}`);
};

// Update task description
const updateTask = (id, description) => {
  if (!id || !description) {
    console.log("ID and description are required!");
    return;
  }

  const tasks = readFile();
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    console.log("Task not found!");
    return;
  }

  task.description = description;
  task.updated_at = currentTime;
  writeFile(tasks);
  console.log(`Task ID: ${id} updated successfully!`);
};

// Delete a task by ID
const deleteTask = (id) => {
  if (!id) {
    console.log("ID is required!");
    return;
  }

  const tasks = readFile();
  // skip deleted tasks
  const filteredTasks = tasks.filter((task) => task.id !== id);

  if (tasks.length === filteredTasks.length) {
    console.log("Task not found!");
    return;
  }

  writeFile(filteredTasks);
  console.log(`Task ID: ${id} deleted successfully!`);
};

// List all tasks
const listTasks = () => {
  const tasks = readFile();
  if (tasks.length === 0) {
    console.log("No tasks found!");
    return;
  }

  console.log("Your Tasks:");
  tasks.forEach((task) =>
    console.log(
      `ID: ${task.id} | Description: ${task.description} | Status: ${task.status}`
    )
  );
};

// Change task status
const changeTaskStatus = (id, status) => {
  if (!id || !status) {
    console.log("ID and status are required!");
    return;
  }

  if (!preDefinedStatus.includes(status.toLowerCase())) {
    console.log(`Invalid status! Valid statuses: ${preDefinedStatus.join(", ")}`);
    return;
  }

  const tasks = readFile();
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    console.log("Task not found!");
    return;
  }

  task.status = status;
  task.updated_at = currentTime;
  writeFile(tasks);
  console.log(`Task ID: ${id} status updated to "${status}"!`);
};

// List tasks by status
const listTasksByStatus = (status) => {
  if (!status) {
    console.log("Status is required!");
    return;
  }

  const tasks = readFile();
  const filteredTasks = tasks.filter(
    (task) => task.status.toLowerCase() === status.toLowerCase()
  );

  if (filteredTasks.length === 0) {
    console.log(`No tasks found with status "${status}"!`);
    return;
  }

  console.log(`Tasks with status "${status}":`);
  filteredTasks.forEach((task) =>
    console.log(`ID: ${task.id} | Description: ${task.description}`)
  );
};

// Main CLI program
const runTodoCLI = () => {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("Usage: todo-cli <command> [options]");
    console.log("Commands:");
    console.log("  add <description>          Add a new task");
    console.log("  update <id> <description>  Update task description");
    console.log("  delete <id>                Delete a task");
    console.log("  list                       List all tasks");
    console.log("  changestatus <id> <status> Change task status");
    console.log("  liststatus <status>        List tasks by status");
    return;
  }

  const command = args[0].toLowerCase();
  switch (command) {
    case "add":
      addTask(args[1]);
      break;
    case "update":
      updateTask(args[1], args[2]);
      break;
    case "delete":
      deleteTask(args[1]);
      break;
    case "list":
      listTasks();
      break;
    case "changestatus":
      changeTaskStatus(args[1], args[2]);
      break;
    case "liststatus":
      listTasksByStatus(args[1]);
      break;
    default:
      console.log("Invalid command! Use 'todo-cli' for usage instructions.");
  }
};

runTodoCLI();
