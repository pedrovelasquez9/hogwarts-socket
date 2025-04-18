class UserRepository {
    constructor() {
        this.users = [];
        this.MAX_USERS = 5;
    }

    addUser(user) {
        if (this.users.length >= this.MAX_USERS) {
            throw new Error('Reached max connected users');
        }
        this.users.push(user);
    }

    removeUser(socketId) {
        this.users = this.users.filter(user => user.socketId !== socketId);
    }

    getUserCount() {
        return this.users.length;
    }

    getAllUsers() {
        return this.users;
    }
}

module.exports = UserRepository;
