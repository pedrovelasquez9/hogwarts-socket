class ConnectUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    execute(user) {
        this.userRepository.addUser(user);
        return user;
    }
}

module.exports = ConnectUser;
