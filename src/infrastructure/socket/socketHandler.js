const { Server } = require('socket.io');
const UserRepository = require('../../domain/repositories/UserRepository');
const HouseRepository = require('../../domain/repositories/HouseRepository');
const ConnectUser = require('../../use-cases/ConnectUser');
const IncrementHousePoints = require('../../use-cases/IncrementHousePoints');
const User = require('../../domain/entities/User');
const RestartHousePoints = require('../../use-cases/RestartHousePoints');

function initializeSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    const userRepository = new UserRepository();
    const houseRepository = new HouseRepository();
    const connectUser = new ConnectUser(userRepository);
    const incrementHousePoints = new IncrementHousePoints(houseRepository);
    const restartHousePoints = new RestartHousePoints(houseRepository);

    io.on('connection', (socket) => {
        console.log(`New connection: ${socket.id}`);

        socket.on('register', (data, callback) => {
            const { name } = data;
            try {
                const user = new User(name, socket.id);
                connectUser.execute(user);
                callback({ status: 'ok', message: 'Registered user', houses: houseRepository.getAllHouses() });
                io.emit('userList', userRepository.getAllUsers());
            } catch (error) {
                callback({ status: 'error', message: error.message });
            }
        });

        socket.on('increment', (data, callback) => {
            const { houseName } = data;
            try {
                const newPoints = incrementHousePoints.execute(houseName);
                io.emit('pointsUpdate', { houseName, newPoints });
                callback({ status: 'ok', newPoints });
            } catch (error) {
                callback({ status: 'error', message: error.message });
            }
        });

        socket.on('restart', (data, callback) => {
            const { houseName } = data;
            try {
                const newPoints = restartHousePoints.execute(houseName);
                io.emit('pointsUpdate', { houseName, newPoints });
                callback({ status: 'ok', newPoints });
            } catch (error) {
                callback({ status: 'error', message: error.message });
            }
        })

        socket.on('disconnect', () => {
            console.log(`socket disconnection: ${socket.id}`);
            userRepository.removeUser(socket.id);
            io.emit('userList', userRepository.getAllUsers());
        });
    });
}

module.exports = { initializeSocket };
