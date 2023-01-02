import React, { useEffect, useState } from 'react';
const Chats = ({ socket }) => {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const messageListener = (message) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        newMessages[message.id] = message;
        return newMessages;
      });
    };

    const deleteMessageListener = (messageID) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        delete newMessages[messageID];
        return newMessages;
      });
    };

    socket.on('message', messageListener);
    socket.on('deleteMessage', deleteMessageListener);
    socket.emit('getMessages');

    return () => {
      socket.off('message', messageListener);
      socket.off('deleteMessage', deleteMessageListener);
    };
  }, [socket]);

  return (
    <ul id="chat">
      {[...Object.values(messages)]
        .sort((a, b) => a.time - b.time)
        .map((message) => {
          return (
            <li
              className={`${
                Object.values(messages)[0]?.user?.id === message?.user?.id
                  ? 'me'
                  : 'you'
              }`}
              key={message?.id}
            >
              <div className="entete">
                <span
                  className={`status ${
                    Object.values(messages)[0]?.user?.id === message?.user?.id
                      ? 'blue'
                      : 'green'
                  }`}
                />
                <h2 style={{ marginLeft: '5px' }}>{message?.user?.name}</h2>
                <h3 style={{ marginLeft: '7px' }}>
                  {` ${new Date(message.time).toLocaleTimeString()}`}, Today
                </h3>
              </div>
              <div className="triangle" />
              <div className="message">{message.value}</div>
            </li>
          );
        })}
    </ul>
  );
};

export default Chats;
