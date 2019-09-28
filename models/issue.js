const mongoose = require('mongoose');
const Issue = new mongoose.Schema({
    title: {
        type: String
    },
    responsible: {
        type: String
    },
    severity: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String,
        default: "open"
    }
});
module.exports = mongoose.model('Issue', Issue);