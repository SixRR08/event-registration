import React, { useState } from "react";
import axios from "axios";

const ParticipantList = ({ participants, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    fullName: "",
    email: "",
    age: "",
  });

  const handleEditClick = (participant) => {
    setEditingId(participant._id);
    setEditForm({
      fullName: participant.fullName,
      email: participant.email,
      age: participant.age,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: name === "age" ? Number(value) : value,
    });
  };

  const handleUpdate = async () => {
    if (
      !editForm.fullName.trim() ||
      !editForm.email.includes("@") ||
      editForm.age <= 0
    ) {
      alert("Please enter valid data.");
      return;
    }

    try {
      await axios.put(`/api/participants/${editingId}`, editForm);
      setEditingId(null);
      setEditForm({ fullName: "", email: "", age: "" });
      onUpdate();
    } catch (err) {
      console.error("Error updating participant:", err);
      alert("Update failed. See console.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/participants/${id}`);
      onUpdate();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="row mt-4">
      {participants.map((p) => (
        <div className="col-md-4 mb-4" key={p._id}>
          <div className="card shadow-sm">
            <div className="card-body">
              {editingId === p._id ? (
                <>
                  <input
                    name="fullName"
                    className="form-control mb-2"
                    value={editForm.fullName}
                    onChange={handleInputChange}
                  />
                  <input
                    name="email"
                    className="form-control mb-2"
                    value={editForm.email}
                    onChange={handleInputChange}
                  />
                  <input
                    name="age"
                    type="number"
                    className="form-control mb-3"
                    value={editForm.age}
                    onChange={handleInputChange}
                  />
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={handleUpdate}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h5 className="card-title">{p.fullName}</h5>
                  <p className="card-text mb-1">
                    <strong>Email:</strong> {p.email}
                  </p>
                  <p className="card-text mb-3">
                    <strong>Age:</strong> {p.age}
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEditClick(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParticipantList;
