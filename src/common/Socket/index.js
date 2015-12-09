import Channel from './Channel';
import Data from './Data';
import Default from './Default';
import Push from './Push';
import Schedule from './Schedule';
import Trigger from './Trigger';
import User from './User';
import Users from './Users';
import Webhook from './Webhook';

let Socket = Default;

Socket.Channel = Channel;
Socket.Data = Data;
Socket.Push = Push;
Socket.Schedule = Schedule;
Socket.Trigger = Trigger;
Socket.User = User;
Socket.Users = Users;
Socket.Webhook = Webhook;

export default Socket;
