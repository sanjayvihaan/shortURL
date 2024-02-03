const express = require('express');
const { connectToMongoDB } = require('./connect')

const URL = require('./models/url');
require('dotenv').config();

const urlRoute = require('./routes/url')
const app = express();
const port = process.env.PORT || 8001;

const mongoDBURL = 'mongodb://127.0.0.1:27017/short-url';

connectToMongoDB(mongoDBURL)
.then(() => {
    console.log('MongoDB connected');
})

app.use(express.json());

app.use('/url', urlRoute);


app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    },
    {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            }
        },
    });
    res.redirect(entry.redirectURL);
})

app.listen(port, () => {
    console.log("Running on port", port);
})