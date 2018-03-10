const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4000;

const { Mongoose } = require('./db/indexDB');
const { User } = require('./models/user');
const { Todo } = require('./models/todo');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  console.log(`Requested url: ${req.url} Requested Method: ${req.method}`);
  next();
});

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/todos', (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos });
    },
    err => {
      res.sendStatus(404);
      console.log(err);
    }
  );
});

app.get('/users', (req, res) => {
  User.find()
    .then(
      users => {
        res.send({ users });
      },
      err => {
        res.sendStatus(404);
        console.log(err);
      }
    )
    .catch(err => {
      res.sendStatus(404);
      console.log(err);
    });
});

app.get('/todo/', (req, res) => {
  //http://localhost:4000/todo?id=5aa2cdf42b076f1e20e99b86
  Todo.find({
    _id: req.query.id
  })
    .then(
      doc => {
        res.send(doc);
      },
      err => {
        res.sendStatus(404);
        console.log(err);
      }
    )
    .catch(err => {
      res.sendStatus(404);
      console.log(err);
    });
});

app.get('/todo/:userid', (req, res) => {
  Todo.find({
    _id: req.params.userid
  })
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      res.sendStatus(404);
      console.log(err);
    });
});

app.post('/todo', (req, res) => {
  let todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    completedAt: req.body.completedAt
  });
  todo.save().then(
    doc => {
      res.json(doc);
    },
    err => {
      res.sendStatus(400);
      console.log(err);
    }
  );
});

app.post('/user', (req, res) => {
  let user = new User({
    email: req.body.email
  });
  user.save().then(
    doc => {
      res.json(doc);
    },
    err => {
      res.sendStatus(404);
      console.log(err);
    }
  );
});

const server = app.listen(port, (req, res) => {
  console.log(`App is listening to Port: ${server.address().port}`);
});
