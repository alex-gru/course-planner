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

app.put("/api/course", (req, res) => {
  console.log("Create new course: " + req.body.id);
  const newCourse = new CourseModel({
    id: req.body.id,
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
  console.log("Create new module: " + req.body.id);
  const newModule = new ModuleModel({
    id: req.body.id,
    name: req.body.name,
    compulsory: req.body.compulsory,
    description: req.body.description,
    objective: req.body.objective
  });
  newModule.save();
  res.json("ok");
});

app.delete('/api/course/:id', (req, res) => {
  if (req.params.id) {
    log("Delete course: " + req.params.id);
    CourseModel.find({id: req.params.id}).remove().exec();
    res.json("ok");
  }
});

app.delete('/api/module/:id', (req, res) => {
  if (req.params.id) {
    log("Delete module (and linked courses): " + req.params.id);
    ModuleModel.find({id: req.params.id}).remove().exec();
    CourseModel.find({moduleId: req.params.id}).remove().exec();
    res.json("ok");
  }
});

// SPA entrypoint

app.get('*', function (req, res) {
  res.render('index', {title: "Course Planner"});
});