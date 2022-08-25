import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ list, deleteItem, editItem }) => {
    return (
        <div className="grocery-list">
            {list.map((listItem) => {
                const { id, value } = listItem;
                return (
                    <article key={id} className="grocery-item">
                        <p className="title">{value}</p>
                        <div className="btn-container">
                            <button
                                type="button"
                                className="edit-btn"
                                onClick={() => editItem(id)}
                            >
                                <FaEdit />
                            </button>
                            <button
                                type="button"
                                className="delete-btn"
                                onClick={() => deleteItem(id)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </article>
                );
            })}
        </div>
    );
};

export default List;
