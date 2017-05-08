import * as express from "express";
import * as http from "http";
import * as reload from "reload";
import * as mongoose from "mongoose";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as autoIncrement from "mongoose-auto-increment";

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
  setUpMongo();
}

function setUpMongo() {
  mongoose.connect('mongodb://mongodb:27017/db');
  autoIncrement.initialize(mongoose.connection);
  mongoose.connection.on('connected', () => {
    log("Connection to MongoDB established.");

    const ModuleSchema = new mongoose.Schema(
      {
        _id: Number,
        name: String,
        compulsory: Boolean,
        description: String,
        objective: String
      });
    ModuleSchema.plugin(autoIncrement.plugin, {model: 'Module', startAt: 100});
    ModuleModel = mongoose.model('Module', ModuleSchema, 'modules');
    const CourseSchema = new mongoose.Schema(
      {
        _id: Number,
        name: String,
        number: String,
        ects: Number,
        type: String,
        lecturer: String,
        moduleId: Number,
        description: String,
        objective: String
      });
    CourseSchema.plugin(autoIncrement.plugin, {model: 'Course', startAt: 100});
    CourseModel = mongoose.model('Course', CourseSchema, 'courses');
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

app.get('/api/course/:_id', (req, res) => {
  if (req.params._id) {
    CourseModel.findOne({_id: req.params._id}, (err, course) => {
      res.json(course);
    });
  }
});

app.get('/api/modules', (req, res) => {
  ModuleModel.find({}, (err, modules) => {
    res.json(modules);
  });
});

app.get('/api/module/:_id', (req, res) => {
  if (req.params._id) {
    ModuleModel.findOne({_id: req.params._id}, (err, module) => {
      res.json(module);
    });
  }
});

app.get('/api/module/:_id/courses', (req, res) => {
  if (req.params._id) {
    CourseModel.find({moduleId: req.params._id}, (err, courses) => {
      res.json(courses);
    });
  }
});

app.put("/api/course", (req, res) => {
  console.log("Create new course.");
  const newCourse = new CourseModel({
    name: req.body.name,
    number: req.body.number,
    ects: req.body.ects,
    type: req.body.type,
    lecturer: req.body.lecturer,
    moduleId: req.body.moduleId,
    description: req.body.description,
    objective: req.body.objective
  });
  newCourse.save();
  res.json("ok");
});

app.put("/api/module", (req, res) => {
  console.log("Create new module.");
  const newModule = new ModuleModel({
    name: req.body.name,
    compulsory: req.body.compulsory,
    description: req.body.description,
    objective: req.body.objective
  });
  newModule.save();
  res.json("ok");
});

app.delete('/api/course/:_id', (req, res) => {
  if (req.params._id) {
    log("Delete course: " + req.params._id);
    CourseModel.find({_id: req.params._id}).remove().exec();
    res.json("ok");
  }
});

app.delete('/api/module/:_id', (req, res) => {
  if (req.params._id) {
    log("Delete module (and linked courses): " + req.params._id);
    ModuleModel.find({_id: req.params._id}).remove().exec();
    CourseModel.find({moduleId: req.params._id}).remove().exec();
    res.json("ok");
  }
});

// SPA entrypoint

app.get('*', function (req, res) {
  res.render('index', {title: "Course Planner"});
});