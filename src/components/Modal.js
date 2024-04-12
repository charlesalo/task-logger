import React, { useState } from "react";
import Subtask from "./Subtask";

const Modal = ({ title, subtasks, taskId, updateSubtasks, closeModal }) => {
    const [newSubtaskTitle, setNewSubtaskTitle] = useState("");

    const addSubtask = () => {
        if (!newSubtaskTitle.trim()) return;

        const updatedSubtasks = [
            ...subtasks,
            { id: Date.now(), title: newSubtaskTitle, status: "Pending" },
        ];

        updateSubtasks(taskId, updatedSubtasks);
        setNewSubtaskTitle("");
    };

    const updateSubtaskStatus = (subtaskId, status) => {
        const updatedSubtasks = subtasks.map((subtask) =>
            subtask.id === subtaskId ? { ...subtask, status } : subtask
        );

        updateSubtasks(taskId, updatedSubtasks);
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <button className="close-btn" onClick={closeModal}>
                    X
                </button>
                <h2>{title}</h2>
                <div className="add-subtask-form">
                    <input
                        type="text"
                        value={newSubtaskTitle}
                        onChange={(e) => setNewSubtaskTitle(e.target.value)}
                        placeholder="Type your subtask"
                    />
                    <button onClick={addSubtask}>Add Subtask</button>
                </div>
                {subtasks.map((subtask) => (
                    <Subtask
                        key={subtask.id}
                        subtask={subtask}
                        updateSubtaskStatus={updateSubtaskStatus}
                    />
                ))}
            </div>
        </div>
    );
};

export default Modal;
