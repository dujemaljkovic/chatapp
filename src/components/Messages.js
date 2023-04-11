import React from "react";


const Messages = ({ messages, currentMember }) => {
  const renderMessage = (message, index) => {
    const { member, text } = message;
    if (!member) {
      console.error("Invalid message: no member object", message);
      return null;
    }
    const messageFromMe = member.id === currentMember.id;

    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";

    return (
      <li key={index} className={className}>
        <span className="avatar" style={{ backgroundColor: member.clientData.color }} />
        <div className="Message-content">
          <div className="username">{member.clientData.username}</div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  };

  return (
    <ul className="Messages-list">
      {messages.map((m, i) => renderMessage(m, i))}
    </ul>
  );
};

export default Messages;


