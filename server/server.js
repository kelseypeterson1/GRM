const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');

const studentCsvRouter = require('./routes/studentCsv.router');
const adminCsvRouter = require('./routes/adminCsv.router');
const studentRouter = require('./routes/student.router')
const questionRouter = require('./routes/questions.router');

// Router that add new data cohorts, semesters, etc. 
const cohortRouter = require('./routes/cohort.router');
const scoresRouter = require('./routes/scores.router');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);

app.use('/api/studentCsv', studentCsvRouter);
app.use('/api/adminCsv', adminCsvRouter);
app.use('/api/student', studentRouter);
app.use('/questions', questionRouter);

app.use('/api/admin/cohort', cohortRouter)
app.use('/scores', scoresRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
