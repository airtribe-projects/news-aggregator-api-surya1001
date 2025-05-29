const express = require('express');
const { default: mongoose } = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", require("./user/user.route"))
app.use("/news", require("./news/news.route"))

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("MongoDB connected")
    app.listen(port, (err) => {
        if (err) {
            return console.log('Something bad happened', err);
        }
        console.log(`Server is listening on ${port}`);
    });
}).catch((err) => {
    console.log("Unable to connect to mongo", err)
})

module.exports = app;