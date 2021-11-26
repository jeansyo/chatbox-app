const { verifyJWT } = require("../helpers/jwt");
const Chat = require("../models/chat");

const ChatMessages = new Chat();

const _socketController = (client, io) => {

    const token = client.handshake.headers['x-token'];

    if( token ){
        const user = verifyJWT( token );
    
        if( !user ){
            return client.disconnect();
        }
    
        // special sale for private messages
        client.join( user._id );// global, socket.id, usuario.id
    
        // add user online
        ChatMessages.connectUser({ _id:user._id, name:user.name });
        
        io.emit( 'users-online', ChatMessages.usersArr )
    
        client.on('client-connected', () => {
            client.broadcast.emit('server-alert', {
                msg: `${ user.name } online.`,
                type: 'success'
            })
        })
    
        client.on( 'send-message', ({ message, _id }) => {
    
            if( _id ){
                // private menssage
                client.to( _id ).emit( "private-message", { from: user._id, message } )
            }else {
                ChatMessages.sendMessage( {_id:user._id, name:user.name, message })
                io.emit( 'receive-messages', ChatMessages.latest )
            }
        } )
    
        
    
        // client.emit( 'receive-messages', ChatMessages.latest )
    
        client.on("disconnect", () => {
            ChatMessages.disconnectUser( user._id )
            io.emit("users-online",  ChatMessages.usersArr);
            io.emit('server-alert', {
                msg: `${ user.name } disconnected`,
                type: 'danger'
            });
        })

    }

}


module.exports = {
    _socketController
}