const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let tasks = [];
let completedTasks = [];


app.get('/', (req, res) => {
  res.render('index', { tasks: tasks, completedTasks: completedTasks });
});


app.post('/addtask', (req, res) => {
  let newTask = req.body.newtask;
  tasks.push(newTask);
  res.redirect('/');
});


app.post('/deletetask', (req, res) => {
  let taskToDelete = req.body.task;
  tasks = tasks.filter((task) => task !== taskToDelete);
  res.redirect('/');
});


app.get('/edittask/:task', (req, res) => {
  let taskToEdit = req.params.task;
  res.render('edit', { oldTask: taskToEdit });
});

app.post('/updatetask', (req, res) => {
  let oldTask = req.body.oldtask;
  let updatedTask = req.body.updatedtask;

  let taskIndex = tasks.indexOf(oldTask);
  if (taskIndex !== -1) {
    tasks[taskIndex] = updatedTask;
  }
  res.redirect('/');
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});
