import * as express from "express";
import * as http from "http";
import * as reload from "reload";
import * as mongoose from "mongoose";
import * as path from "path";

const port = 80;
const app = express();

let Greeting;
let CourseModel;
let ModuleModel;

// provide paths to static files
app.use("/js", express.static(__dirname + '/public/js'));
app.use("/css", express.static(__dirname + '/public/css'));
app.use("/views", express.static(__dirname + '/views'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const server = http.createServer(app);
reload(server, app);
server.listen(port, () => {
    const host = server.address().address;
    console.log("Webapp listening at http://%s:%s", host, port)
});

if (mongoose.connection.readyState === 0) {
    /* 0 = disconnected, 1 = connected,  2 = connecting,  3 = disconnecting  */
    mongoose.connect('mongodb://mongodb:27017/db');
    mongoose.connection.on('connected', () => {
        log("Connection to MongoDB established.");

        Greeting = mongoose.model('Greeting',
            new mongoose.Schema({text: String}),
            'greetings');     // collection name
        ModuleModel = mongoose.model('Module',
            new mongoose.Schema(
                {
                    id: Number,
                    name: String,
                    obligatory: String
                }
            ), 'modules');     // collection name
        CourseModel = mongoose.model('Course',
            new mongoose.Schema(
                {
                    id: Number,
                    name: String,
                    number: String,
                    ects: Number,
                    type: String,
                    lecturer: String,
                    moduleId: Number
                }
            ), 'courses');     // collection name
    });
}

function log(message: any) {
    const date = new Date();
    console.log(date.toISOString() + " - ", message);
}


// REST

app.get('/', (req, res) => {
    Greeting.findOne((err, greeting) => {
        res.render('index', {title: "Course Planner", greeting: greeting.text});
    });
});

app.get('/courses', (req, res) => {
    CourseModel.find({}, (err, courses) => {
        res.json(courses);
    });
});
app.get('/course/:id', (req, res) => {
    if (req.params.id) {
        CourseModel.find({id: req.params.id}, (err, course) => {
            res.json(course);
        });
    }
});
app.get('/modules', (req, res) => {
    ModuleModel.find({}, (err, modules) => {
        res.json(modules);
    });
});
app.get('/module/:id', (req, res) => {
    if (req.params.id) {
        ModuleModel.find({id: req.params.id}, (err, module) => {
            res.json(module);
        });
    }
});