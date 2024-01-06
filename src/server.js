const express = require("express");
const app = express();
const port = 3000;
const requests = require("./modules/requests.module/routes");
const workers = require("./modules/workers.module/routes");
const users = require("./modules/users.module/routes");
const { login, registerUser } = require("./modules/auth.module/login.controller");
const cors = require('cors');
const { receiveMessage } = require("./modules/rabbit/receive");
const { sendMessage } = require("./modules/rabbit/send");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json({ limit: "200kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get("/", (req, res) => res.send("Server works!"));
app.use("/auth/login", login);

app.use("/auth/register_user", registerUser);

app.use("/requests", requests);
app.use("/workers", workers);
app.use("/users", users);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
    console.log(`Server is running on http://localhost:${port}`);

    receiveMessage(process.env.service_queue);
});
