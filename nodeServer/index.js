const io = require('socket.io')(8000, {
      cors: {
        origin: '*',
      }
    });
const users = {}
io.on('connection', socket => {
      // new user joins, other useres will get to know
      socket.on('new-user-joined', name => {

            console.log("New User is", name)
            users[socket.id] = name;

            //will tell everyone new user joined;
            socket.broadcast.emit('user-joined', name);
      })
      // if some1 sends msg broadcast it
      socket.on('send', message => {
            socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
      });
      // if some1 leaves chat
      socket.on('disconnect', message => {
            socket.broadcast.emit('left', users[socket.id]);
            delete users[socket.id];
      });
})