import React from "react";
import axios from "axios";

const ParticipantList = ({ participants, onUpdate }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/participants/${id}`);
      onUpdate(); // Refresh list after deletion
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div>
      <h2>Registered Participants</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((p) => (
            <tr key={p._id}>
              <td>{p.fullName}</td>
              <td>{p.email}</td>
              <td>{p.age}</td>
              <td>
                <button onClick={() => handleDelete(p._id)}>Delete</button>
                {/* Edit will be added next */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipantList;
