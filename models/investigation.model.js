const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Investigation = new Schema({
    investigation_description: {
        type: String
    },
    report_fault_date: {
        type: String
    },
    report_location: {
        type: String
    },
    report_platform: {
        type: Number
    },
    report_sub_platform: {
        type: Number
    },
    report_platform_num: {
        type: String
    },
    report_date: {
        type: String
    },
    report_reporter_username: {
        type: String
    },
    report_summary: {
        type: String
    },
    report_system: {
        type: Number
    }
});

module.exports = mongoose.model('Investigation', Investigation);