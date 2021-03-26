const express = require('express');
const path = require('path');

const PORT = 5000;

const app = express();
const router = express.Router();

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/pages/dashboard.html"));
});

app.get("*", (req, res) => {
    res.send("404 - The resource you are trying to access is either broken or does not exist.");
});

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`);
});