import React, { useState } from 'react';
import Modal from "./Modal";

const Task = ({ task, deleteTask, updateSubtasks }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const getTaskProgress = () => {
        const totalSubtasks = task.subtasks.length;
        const completedSubtasks = task.subtasks.filter(
            (subtask) => subtask.status === "Completed"
        ).length;
        return totalSubtasks === 0
            ? 0
            : (completedSubtasks / totalSubtasks) * 100;
    };

    const progress = getTaskProgress();
    const progressColor =
        progress === 100 ? "green" : progress > 0 ? "orange" : "grey";

    return (
        <div className="task">
            <div className="task-header">
                <h3 onClick={toggleModal}>{task.title}</h3>
                <button onClick={() => deleteTask(task.id)}>X</button>
            </div>
            <div className="task-progress-bar-container" onClick={toggleModal}>
                <div
                    className="task-progress-bar"
                    style={{
                        width: `${progress}%`,
                        backgroundColor: progressColor,
                    }}
                ></div>
            </div>
            {modalOpen && (
                <Modal
                    title={task.title}
                    subtasks={task.subtasks}
                    taskId={task.id}
                    updateSubtasks={updateSubtasks}
                    closeModal={toggleModal}
                />
            )}
        </div>
    );
};

export default Task;
