import * as express from "express";
import * as http from "http";
import * as reload from "reload";
import * as mongoose from "mongoose";
import * as path from "path";

// Constants
const port = 8080;

// App
const app = express();

// provide paths to static files
app.use("/js", express.static(__dirname + '/public/js'));
app.use("/css", express.static(__dirname + '/public/css'));
app.use("/views", express.static(__dirname + '/views'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

let Greeting;
let CourseModel;
let ModuleModel;

app.get('/', (req, res) => {
    Greeting.findOne((err, greeting) => {
        res.render('index', {title: "Course Planner", greeting: greeting.text});
    });
    CourseModel.findOne((err, course) => {
        console.log(course.name);
    });
    ModuleModel.findOne((err, module) => {
        console.log(module.name);
    });
});

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