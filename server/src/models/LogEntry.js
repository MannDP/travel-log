const mongoose = require('mongoose');
const { Schema } = mongoose;

const requiredField = {
    required: true
}

const logEntrySchema = new Schema({
    title: {
        type: String,
        ...requiredField
    },
    description: {
        type: String
    },
    comments: {
        type: String
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        default: 0
    },
    image: {
        type: String
    },
    visitDate: {
        type: Date,
        ...requiredField
    },
    latitude: {
        type: Number,
        ...requiredField,
        min: -90,
        max: 90
    },
    longitude: {
        type: Number,
        ...requiredField,
        min: -180,
        max: 180
    },
}, {timestamps: true});

var LogEntry =  mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry;
