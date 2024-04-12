import React from "react";

const statusColors = {
    Pending: "grey",
    Ongoing: "orange",
    Completed: "green",
};

const Subtask = ({ subtask, updateSubtaskStatus }) => {
    const { id, title, status } = subtask;

    const handleStatusChange = (newStatus) => {
        updateSubtaskStatus(id, newStatus);
    };

    return (
        <div
            className="subtask"
            style={{ backgroundColor: statusColors[status] }}
        >
            <span>{title}</span>
            <div className="subtask-actions">
                {status !== "Pending" && (
                    <button onClick={() => handleStatusChange("Pending")}>
                        Mark as Pending
                    </button>
                )}
                {status !== "Ongoing" && (
                    <button onClick={() => handleStatusChange("Ongoing")}>
                        Mark as Ongoing
                    </button>
                )}
                {status !== "Completed" && (
                    <button onClick={() => handleStatusChange("Completed")}>
                        Mark as Completed
                    </button>
                )}
            </div>
        </div>
    );
};

export default Subtask;
