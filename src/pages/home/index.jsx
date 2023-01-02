import Chats from 'src/components/common/Chats';
import Information from 'src/components/common/Information';
import Input from 'src/components/common/Input';
import { useCustomSearchParams } from 'src/hooks/useSeachParams';

function Home({ socket }) {
  const [params, setSearch] = useCustomSearchParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const room = e.target[1].value;
    setSearch({ name, room });
    socket.emit('join', { name, room });
  };
  return (
    <div className="home">
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" />
        <select name="room" id="room">
          <option value="1">Room 1</option>
          <option value="2">Room 2</option>
          <option value="3">Room 3</option>
        </select>
        <button type="submit">Join</button>
      </form>
      <Information socket={socket} />
      <Chats socket={socket} />
      <Input socket={socket} />
    </div>
  );
}
export default Home;
