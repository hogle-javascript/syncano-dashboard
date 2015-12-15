import Channel from './Channel';
import CodeBox from './CodeBox';
import Data from './Data';
import Default from './Default';
import Push from './Push';
import Schedule from './Schedule';
import Trigger from './Trigger';
import User from './User';
import Users from './Users';
import EmptyListItem from './EmptyListItem';

let Socket = Default;

Socket.Channel = Channel;
Socket.CodeBox = CodeBox;
Socket.Data = Data;
Socket.Push = Push;
Socket.Schedule = Schedule;
Socket.Trigger = Trigger;
Socket.User = User;
Socket.Users = Users;
Socket.EmptyListItem = EmptyListItem;

export default Socket;
