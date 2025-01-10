import React from "react";

function ServerMessage({ message }) {
  return (
    <div>
      {message ? (
        <h2>Message from Server: "{message}"</h2>
      ) : (
        <p>Loading message from server...</p>
      )}
    </div>
  );
}

export default ServerMessage;
