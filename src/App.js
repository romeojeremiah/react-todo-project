import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
    let list = localStorage.getItem("list");

    if (list) {
        return JSON.parse(localStorage.getItem("list"));
    } else {
        return [];
    }
};

function App() {
    const [isAlert, setIsAlert] = useState(false);
    const [alert, setAlert] = useState({});
    const [value, setValue] = useState("");
    const [list, setList] = useState(getLocalStorage());
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState("");

    const deleteItem = (id) => {
        console.log(id);
        const newList = list.filter((item) => item.id !== id);
        setList(newList);

        handleAlert(true, "danger", "item deleted");
    };
    const editItem = (id) => {
        setIsEditing(true);
        setEditId(id);
        const editItem = list.find((item) => item.id === id);
        setValue(editItem.value);
    };

    const handleAlert = (isAlert, alertType, alertText) => {
        setIsAlert(isAlert);
        setAlert({ alertType, alertText });
        setTimeout(() => {
            setIsAlert(false);
        }, 1000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value) {
            handleAlert(true, "danger", "please enter value");
        } else if (value && isEditing) {
            setList(
                list.map((item) => {
                    if (item.id === editId) {
                        return { ...item, value: value };
                    }
                    return item;
                })
            );
            setValue("");
            setEditId(null);
            setIsEditing(false);
            handleAlert(true, "success", "value changed");
        } else {
            const newValue = {
                id: new Date().getTime().toString(),
                value: value,
            };
            setList([...list, newValue]);
            handleAlert(true, "success", "item added to list");
            setValue("");
        }
    };
    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(list));
    }, [list]);
    return (
        <section className="section-center">
            <form className="grocery-form" onSubmit={handleSubmit}>
                {isAlert ? <Alert alert={alert} /> : null}
                <h3>grocery bud</h3>
                <div className="form-control">
                    <input
                        type="text"
                        placeholder="e.g. eggs"
                        className="grocery"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <button className="submit-btn" type="submti">
                        {isEditing ? "edit" : "submit"}
                    </button>
                </div>
                <div className="grocery-container">
                    {list.length > 0 ? (
                        <List
                            list={list}
                            deleteItem={deleteItem}
                            editItem={editItem}
                        />
                    ) : null}

                    {list.length > 0 ? (
                        <button
                            className="clear-btn"
                            onClick={() => {
                                setList([]);
                                handleAlert(true, "danger", "Empty List");
                            }}
                        >
                            clear items
                        </button>
                    ) : null}
                </div>
            </form>
        </section>
    );
}

export default App;
