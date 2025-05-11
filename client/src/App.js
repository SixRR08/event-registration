import React, { useEffect, useState } from "react";
import axios from "axios";
import RegistrationForm from "./components/RegistrationForm";
import ParticipantList from "./components/ParticipantList";
import "./App.css"; // optional, if you're still using any custom styles

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
    <div className="container">
      <div className="text-center text-white mb-5">
        <h1 className="display-4 fw-bold">Event Registration</h1>
      </div>

      <RegistrationForm onRegister={fetchParticipants} />
      <ParticipantList
        participants={participants}
        onUpdate={fetchParticipants}
      />
    </div>
  );
}

export default App;
