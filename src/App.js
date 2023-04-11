import React, { useState, useEffect } from "react";
import "./App.css";
import Messages from "./components/Messages";
import Input from "./components/Input";
import { randomName, randomColor } from "./helpers/Names";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [member, setMember] = useState({
    username: randomName(),
    color: randomColor(),
  });
  const [drone, setDrone] = useState(null);

  useEffect(() => {
    const newDrone = new window.Scaledrone("TQxCi3NMWCxN49Km", {
      data: member,
    });

    let currentRoom;
    if (drone) {
      currentRoom = drone.subscribe("observable-room");
      currentRoom.unsubscribe();
    }

    newDrone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const updatedMember = { ...member };
      updatedMember.id = newDrone.clientId;
      setMember(updatedMember);
    });

    const room = newDrone.subscribe("observable-room");

    room.on("data", (data, member) => {
      setMessages((messages) => [...messages, { member, text: data }]);
    });

    setDrone(newDrone);

    return () => {
      room.unsubscribe();
      newDrone.close();
    };
  }, []);

  const onSendMessage = (message) => {
    drone.publish({
      room: "observable-room",
      message,
    });
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Chat App</h1>
      </div>
      <Messages messages={messages} currentMember={member} />
      <Input onSendMessage={onSendMessage} />
    </div>
  );
};

export default App;
