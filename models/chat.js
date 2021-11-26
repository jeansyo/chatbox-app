class Message {
    constructor( _id, name, message ) {
        this._id     = _id;
        this.name  = name;
        this.message = message;
    }
}


class Chat {

    constructor() {
        this.messages = [];
        this.users = [];
    }

    get latest() {
        this.messages = this.messages.splice(0,10);
        return this.messages;
    }

    get usersArr() {
        return this.users; // [{}, {}, {}]
    }

    sendMessage({  _id, name, message  }) {
        this.messages.unshift(
            new Message(_id, name, message)
        );
    }

    connectUser( user ) {
        this.users.unshift(user)
    }

    disconnectUser( _id ) {
        this.users = this.users.filter( (user) => user._id !== _id )
    }

}

module.exports = Chat;