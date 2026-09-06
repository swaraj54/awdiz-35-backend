import express from 'express';

const app = express();

app.get("/", (req, res) => {
    res.send("Testing endpoint.");
})

app.get("/about", (req, res) => {
    res.send("This is about page.");
})

app.get("/data", (req, res) => {
    res.status(200).json({ message: "This is data endpoint.", status: "success" });
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})  