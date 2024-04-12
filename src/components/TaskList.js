import React from "react";
import Task from "./Task";

const TaskList = ({ title, tasks, deleteTask, updateSubtasks }) => {
    return (
        <div className="list-container">
            <h2>{title}</h2>
            <div className="task-list">
                {tasks.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        deleteTask={deleteTask}
                        updateSubtasks={updateSubtasks}
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskList;
