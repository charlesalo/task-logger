import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";

const TaskManager = () => {
    const [tasks, setTasks] = useState(() => {
        // Load tasks from local storage
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskType, setNewTaskType] = useState("Front-End");

    useEffect(() => {
        // Update local storage when tasks change
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page
        if (!newTaskTitle.trim()) return; // Don't add empty tasks

        const newTask = {
            id: Date.now(),
            title: newTaskTitle,
            type: newTaskType,
            subtasks: [],
        };

        setTasks([...tasks, newTask]);
        setNewTaskTitle("");
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    const updateSubtasks = (taskId, subtasks) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId ? { ...task, subtasks } : task
            )
        );
    };

    return (
        <div>
            <h1>Tasks Logger</h1>
            <form className="main-form" onSubmit={addTask}>
                <div className="task-title">
                    <p>Task Title:</p>
                    <input
                        className="task-input"
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="Enter task title here"
                        autoFocus
                    />
                </div>
                <div className="task-type-options">
                    <div>
                        Task Type:
                        <label>
                            <input
                                type="radio"
                                name="taskType"
                                value="Front-End"
                                checked={newTaskType === "Front-End"}
                                onChange={(e) => setNewTaskType(e.target.value)}
                            />
                            Front-End
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="taskType"
                                value="Back-End"
                                checked={newTaskType === "Back-End"}
                                onChange={(e) => setNewTaskType(e.target.value)}
                            />
                            Back-End
                        </label>
                    </div>
                    <button type="submit">Add Task</button>
                </div>
            </form>
            <div className="tasks-container">
                <TaskList
                    tasks={tasks.filter((task) => task.type === "Front-End")}
                    title="Front-End Tasks"
                    deleteTask={deleteTask}
                    updateSubtasks={updateSubtasks}
                />
                <TaskList
                    tasks={tasks.filter((task) => task.type === "Back-End")}
                    title="Back-End Tasks"
                    deleteTask={deleteTask}
                    updateSubtasks={updateSubtasks}
                />
            </div>
        </div>
    );
};

export default TaskManager;
