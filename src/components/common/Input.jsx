import { useRef } from 'react';
import { Link } from 'react-router-dom';

const Input = ({ socket }) => {
  const refInput = useRef(null);
  const handleSendMessage = (e) => {
    e.preventDefault();
    const message = refInput.current[0].value;
    if (!message && message?.trim('') <= 0) return;
    socket.emit('message', message);
    refInput.current[0].value = '';
  };

  return (
    <footer>
      <form ref={refInput}>
        <textarea placeholder="Type your message" defaultValue={''} />
        <div className="d-flex">
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_picture.png"
            alt="img"
          />
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_file.png"
            alt="img"
          />
          <button
            onClick={handleSendMessage}
            type="submit"
            style={{ marginLeft: 'auto', border: 'none' }}
          >
            <Link>Send</Link>
          </button>
        </div>
      </form>
    </footer>
  );
};

export default Input;
