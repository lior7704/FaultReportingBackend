const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const reportRoutes = express.Router();
const userRoutes = express.Router();
const PORT = 4000;

let Report = require('./models/report.model');
let Investigation = require('./models/investigation.model');
let Platform = require('./models/platform.model');
let SubPlatform = require('./models/sub_platform.model');
let System = require('./models/system.model');
let User = require('./models/user.model');

app.use(cors());
app.use(bodyParser.json());

String.prototype.toObjectId = function() {
    var ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(this.toString());
};

mongoose.set("debug", (collectionName, method, query, doc) => {
    console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
});

const checkIfReportUpdated = function(id, newReport) {
    Report.findById(id.toObjectId(), function (err, report) {
        if (!report) {
            res.status(404).send(`Fault report with id ${id} was not found`);
        } else {
            return report === newReport;
        }
    });
};

mongoose.connect('mongodb://127.0.0.1:27017/reports', {
    useNewUrlParser: true
});
const connection = mongoose.connection;


connection.once('open', function () {
    console.log("MongoDB connection established successfuly");
})

reportRoutes.route('/').get(function (req, res) {
    // console.log(req);
    Report.find(function (err, reports) {
        if (err) {
            console.log(err);
        } else {
            // console.log(reports);
            res.json(reports);
        }

    });
});

reportRoutes.route('/:id').get(function (req, res) {
    const id = req.params.id;
    Report.findById(id.toObjectId(), function (err, report) {
        res.json(report);
    });
});

reportRoutes.route('/add').post(function (req, res) {
    console.log(req.body);
    let report = new Report(req.body);
    report.save()
        .then(report => {
            res.status(200).json({
                'report': 'report added successfully'
            });
        })
        .catch(err => {
            res.status(400).send('adding new report failed');
        });
});

reportRoutes.route('/update/:id').put(function (req, res) {
    const id = req.params.id;
    Report.findById(id.toObjectId(), function (err, report) {
        if (!report) {
            res.status(404).send(`Fault report with id ${id} was not found`);
        } else {
            const newReport = req.body;
            report.appears_in_errors_file = newReport.appears_in_errors_file;
            report.description = newReport.description;
            report.fault_date = new Date(newReport.fault_date);
            report.location = newReport.location;
            report.platform = newReport.platform;
            report.sub_platform = newReport.sub_platform;
            report.platform_num = newReport.platform_num;
            report.reporting_date = new Date(newReport.reporting_date);
            report.reporter_username = newReport.reporter_username;
            report.summary = newReport.summary;
            report.system = newReport.system;
            report.recurring_on_same_vehicle = newReport.recurring_on_same_vehicle;
            report.recurring_on_other_vehicles = newReport.recurring_on_other_vehicles;
            report.temp_solution_description = newReport.temp_solution_description;
            report.temp_solution_found = newReport.temp_solution_found;

            report.save().then(report => {
                // res.status(200).send('Report updated');
                res.status(200).json(report);
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

userRoutes.route('/create').post(function (req, res, next) {
    console.log(req.body);
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(201).json({
                'user': 'user' + user.username + 'created successfully'
            });
        })
        .catch(err => {
            console.error(err);
            if (err.code === 11000) {
                res.status(409).send('User already exists on database');
            }
            else {
                res.status(500).json(err);
            }
            // res.status(400).send('creation of new user failed');
            // console.error(err);
        });
});

userRoutes.route('/validate/:username/:password').get(function (req, res, next) {
    const username = req.params.username;
    const password = req.params.password;
    console.log('username = ' + username + ', password = ' + password);
    User.findOne({username: username, password: password}, function (err, user) {
        if (err) {
            res.status(500).json(err);
        }
        else if (user) {
            console.log('username = ' + username + ', password = ' + password + ' was successfully validated');
            res.status(200).json(user);
        }
        else {
            res.status(401).send('Could not validate user ' + username + ' with the given password');
        }
    });
});

app.use('/reports', reportRoutes);
app.use('/users', userRoutes);

app.listen(PORT, function () {
    console.log("Server running on Port: " + PORT);
});