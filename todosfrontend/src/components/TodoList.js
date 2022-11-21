import axios from "axios";
import React, { useState } from "react";
import { FormControl, ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import { MdCheckBox, MdCheckBoxOutlineBlank, MdEdit, MdDelete } from "react-icons/md"

import {GoTriangleDown} from "react-icons/go"


export default function TodoList({ todos, setTodos }) {

    const [show, setShow] = useState(false);
    const [record, setRecord] = useState(null);

    const handleClose = () => {
        setShow(false);
    }

    const handleDelete = (id) => {
        axios.delete(`api/todos/${id}/`)
            .then(() => {
                const newTodos = todos.filter(t => {
                    return t.id !== id
                });
                setTodos(newTodos);
            }).catch(() => {
                alert("Something went Wrong ...");
            })
    }

    const handleUpdate = async (id, value) => {

        return axios.patch(`/api/todos/${id}/`, value)
            .then((res) => {
                const { data } = res;
                const newtodos = todos.map(t => {
                    if (t.id === id) {
                        return data;
                    }
                    return t;
                })
                setTodos(newtodos);
            }).catch(() => {
                alert("Something went Wrong");
            })
    }


    const renderListGroupItem = (t) => {
        return <ListGroup.Item key={t.id} className="d-flex justify-content-between align-items-center" >
            <div className="d-flex justify-content-center">
                <span style={{ marginRight: "12px", cursor: "pointer" }} onClick={() => {
                    handleUpdate(t.id, {
                        completed: !t.completed
                    })
                }} >

                    {t.completed === true ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                </span>
                <span>
                    {t.name}
                </span>
            </div>
            <div>
                <MdEdit onClick={() => {
                    setRecord(t);
                    setShow(true);
                }} style={{ cursor: "pointer", marginRight: "12px" }} />

                <MdDelete onClick={() => {
                    handleDelete(t.id);
                }} style={{ cursor: "pointer" }} />
            </div>
        </ListGroup.Item>
    }

    const handleChange = (e) => {
        setRecord({
            ...record, name: e.target.value
        })
    }

    const handleSaveChanges = async () => {
        await handleUpdate(record.id, { name: record.name });
        handleClose();
    }

    const completedTodos = todos.filter(t => t.completed === true);
    const incompleteTodos = todos.filter(t => t.completed === false);

    return (
        <>
            <div>
                <div className="mb-2 mt-4">
                    List of Todos<GoTriangleDown/>
                </div>
                <div style={{marginLeft:"25px"}} className="mb-2 mt-4">
                    Incomplete Todos ({incompleteTodos.length})
                </div>
                <ListGroup style={{marginLeft:"25px"}}>
                    
                    {incompleteTodos.map(renderListGroupItem)}
                </ListGroup>
                <div style={{marginLeft:"25px"}} className="mb-2 mt-4">
                    complete Todos ({completedTodos.length})
                </div>
                <ListGroup style={{marginLeft:"25px"}}>
                {completedTodos.map(renderListGroupItem)}

                </ListGroup>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Edit Todo
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl value={record ? record.name : ""} onChange={handleChange} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary"
                            onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary"
                            onClick={handleSaveChanges}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>


        </>
    );
}