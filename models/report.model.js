const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Report = new Schema({
    appears_in_errors_file: {
        type: Boolean
    }, 
    description: {
        type: String
    },
    fault_date: {
        type: Date
    },
    location: {
        type: String
    },
    platform: {
        type: Number
    },
    sub_platform: {
        type: Number
    },
    platform_num: {
        type: String
    },
    reporting_date: {
        type: Date
    },
    reporter_username: {
        type: String
    },
    summary: {
        type: String
    },
    system: {
        type: Number
    }, 
    recurring_on_same_vehicle: {
        type: Boolean
    }, 
    recurring_on_other_vehicles: {
        type: Boolean
    }, 
    temp_solution_description: {
        type: String
    }, 
    temp_solution_found: {
        type: Boolean
    }
});

module.exports = mongoose.model('Report', Report);