import React, { useEffect, useState } from "react";
import axios from "axios";
import RegistrationForm from "./components/RegistrationForm";
import ParticipantList from "./components/ParticipantList";

function App() {
  const [participants, setParticipants] = useState([]);

  const fetchParticipants = async () => {
    const res = await axios.get("/api/participants");
    setParticipants(res.data);
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Event Registration System</h1>
      <RegistrationForm onRegister={fetchParticipants} />
      <ParticipantList
        participants={participants}
        onUpdate={fetchParticipants}
      />
    </div>
  );
}

export default App;
