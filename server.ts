import * as express from "express";
import * as http from "http";
import * as reload from "reload";
import * as mongoose from "mongoose";
import * as path from "path";
import * as bodyParser from "body-parser";

const port = 80;
const app = express();

let CourseModel;
let ModuleModel;

// provide paths to static files
app.use("/", express.static(__dirname + '/app'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/app'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

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

    ModuleModel = mongoose.model('Module',
      new mongoose.Schema(
        {
          id: Number,
          name: String,
          compulsory: Boolean,
          description: String,
          objective: String
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
          moduleId: Number,
          description: String,
          objective: String
        }
      ), 'courses');     // collection name
  });
}

function log(message: any) {
  const date = new Date();
  console.log(date.toISOString() + " - ", message);
}


// API

app.get('/api/courses', (req, res) => {
  CourseModel.find({}, (err, courses) => {
    res.json(courses);
  });
});
app.post('/api/courses/new', (req, res) => {
  const newCourse = new CourseModel({
    id: req.body.course.id,
    name: req.body.course.name,
    number: req.body.course.number,
    ects: req.body.course.ects,
    type: req.body.course.type,
    lecturer: req.body.course.lecturer,
    moduleId: req.body.course.moduleId,
    description: req.body.course.description,
    objective: req.body.course.objective
  });
  newCourse.save();
  console.log("created new course");
  res.redirect('/courses');
});
app.get('/api/course/:id', (req, res) => {
  if (req.params.id) {
    CourseModel.findOne({id: req.params.id}, (err, course) => {
      res.json(course);
    });
  }
});
app.get('/api/modules', (req, res) => {
  ModuleModel.find({}, (err, modules) => {
    res.json(modules);
  });
});
app.post('/api/modules/new', (req, res) => {
  const newModule = new ModuleModel({
    id: req.body.module.id,
    name: req.body.module.name,
    compulsory: req.body.module.compulsory,
    description: req.body.module.description,
    objective: req.body.module.objective
  });
  newModule.save();
  console.log("created new module");
  res.redirect('/modules');
});
app.get('/api/module/:id', (req, res) => {
  if (req.params.id) {
    ModuleModel.findOne({id: req.params.id}, (err, module) => {
      res.json(module);
    });
  }
});
app.get('/api/module/:id/courses', (req, res) => {
  if (req.params.id) {
    CourseModel.find({moduleId: req.params.id}, (err, courses) => {
      res.json(courses);
    });
  }
});

// SPA entrypoint

app.get('*', function (req, res) {
  res.render('index', {title: "Course Planner"});
});