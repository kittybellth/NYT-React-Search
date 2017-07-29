const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    headline: {
        type: String
    },
    snippet: {
        type: String
    },
    url: {
        type: String
    },
    date: {
        type: Date
    }
});

const News = mongoose.model("News", NewsSchema);

module.exports = News;