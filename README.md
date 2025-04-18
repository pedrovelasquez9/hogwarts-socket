# Hogwarts Socket

A real-time Socket.IO application that simulates the Hogwarts house points system from the Harry Potter universe. Users can register, view other connected users, and award points to different Hogwarts houses.

## Features

- Real-time user connection and registration
- Live updates of connected users
- House points management system
- Real-time point updates across all connected clients
- Clean architecture design pattern

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express** - Web framework for Node.js
- **Socket.IO** - Real-time bidirectional event-based communication
- **Clean Architecture** - Organized in domains, use cases, and infrastructure

## Project Structure

```
hogwarts-socket/
├── src/
│   ├── domain/
│   │   ├── entities/          # Core business entities
│   │   │   ├── House.js       # House entity
│   │   │   └── User.js        # User entity
│   │   └── repositories/      # Data access interfaces
│   │       ├── HouseRepository.js
│   │       └── UserRepository.js
│   ├── use-cases/             # Application business rules
│   │   ├── ConnectUser.js
│   │   └── IncrementHousePoints.js
│   ├── infrastructure/        # External interfaces implementation
│   │   └── socket/
│   │       └── socketHandler.js
│   └── entrypoint/            # Entry points to the application
│       └── server.js          # Main application server
└── package.json               # Project dependencies and scripts
```

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/hogwarts-socket.git
   cd hogwarts-socket
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

The server will start on port 3001 (or the port specified in your environment variables).

## Usage

### Server

Start the server using:

```
npm start
```

### Client Integration

Connect to the socket server from your client application:

```javascript
// Using Socket.IO client
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

// Register a user
socket.emit("register", { name: "Harry Potter" }, (response) => {
  if (response.status === "ok") {
    console.log("Registration successful");
    console.log("Houses:", response.houses);
  } else {
    console.error("Registration failed:", response.message);
  }
});

// Listen for user list updates
socket.on("userList", (users) => {
  console.log("Connected users:", users);
});

// Award points to a house
socket.emit("increment", { houseName: "Gryffindor" }, (response) => {
  if (response.status === "ok") {
    console.log(`Points updated: ${response.newPoints}`);
  } else {
    console.error("Failed to update points:", response.message);
  }
});

// Listen for point updates
socket.on("pointsUpdate", ({ houseName, newPoints }) => {
  console.log(`${houseName} now has ${newPoints} points!`);
});
```

## API Documentation (Socket Events)

### Client to Server Events

#### `register`

Register a new user to the system.

**Parameters:**

- `data` (Object):
  - `name` (String): The name of the user

**Callback:**

- `response` (Object):
  - `status` (String): 'ok' or 'error'
  - `message` (String): Success or error message
  - `houses` (Array): List of Hogwarts houses (only on success)

#### `increment`

Increment points for a specific house.

**Parameters:**

- `data` (Object):
  - `houseName` (String): Name of the house to increment points for

**Callback:**

- `response` (Object):
  - `status` (String): 'ok' or 'error'
  - `message` (String): Error message (only on error)
  - `newPoints` (Number): Updated point total (only on success)

### Server to Client Events

#### `userList`

Emitted when the user list changes (new user or disconnection).

**Parameters:**

- `users` (Array): Current list of connected users

#### `pointsUpdate`

Emitted when house points are updated.

**Parameters:**

- `data` (Object):
  - `houseName` (String): Name of the house that was updated
  - `newPoints` (Number): Current point total for the house

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
