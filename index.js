require('dotenv').config();
const express = require('express');
const app = express();
const ports = process.env.PORT || 3000;
const expressFileUpload = require('express-fileupload');
const errorHandler = require('./controllers/error');
const extractToken = require('./middlewares/extractToken');
const requireAuth = require('./middlewares/requireAuth');
var cors = require('cors');
app.use(cors());
app.use(express.urlencoded({extended: true}));
// parser
app.use(express.json({limit: '50mb'}));
app.use(expressFileUpload());
app.use(express.static('middleware'));  // to fetch data http://localhost:3000/uploads/200.png => http://localhost:3000/uploads/ + `filename`
app.use(extractToken);

// routes access
const usersRoutes = require('./routes/user.routes.js');
const gendersRoutes = require('./routes/gender.routes.js');
const rolesRoutes = require('./routes/role.routes.js');
const badgesRoutes = require('./routes/badge.routes.js');
const likesRoutes = require('./routes/like.routes.js');
const userRolesRoutes = require('./routes/role.user.routes.js');
const groupeRoutes = require('./routes/groupe.routes.js');
const userLikesRoutes = require('./routes/like.user.routes.js');
const userBadgesRoutes = require('./routes/badge.user.routes.js');
const groupUsersRoutes = require('./routes/groupe.user.routes.js');
const postRoutes = require('./routes/post.routes.js');
const examenRoutes = require('./routes/examen.routes.js');
const questionRoutes = require('./routes/question.routes.js');
const choiceRoutes = require('./routes/choice.routes.js');
const answerRoutes = require('./routes/answer.routes.js');
const funFactRoutes = require('./routes/funFact.routes.js');
const authRoutes = require('./routes/auth.routes.js');


app.use('/users',requireAuth, usersRoutes);
app.use('/auth', authRoutes);
app.use('/genders', requireAuth, gendersRoutes);
app.use('/roles', requireAuth, rolesRoutes);
app.use('/badges', requireAuth,badgesRoutes);
app.use('/likes', requireAuth, likesRoutes);
app.use('/user-roles', requireAuth, userRolesRoutes);
app.use('/groups', requireAuth, groupeRoutes);
app.use('/user-likes', requireAuth, userLikesRoutes);
app.use('/user-badges', requireAuth, userBadgesRoutes);
app.use('/user-groups', requireAuth, groupUsersRoutes);
app.use('/posts', requireAuth, postRoutes);


//routes exa  == quizz 
app.use('/examens', examenRoutes)
app.use('/questions', questionRoutes)
app.use('/choices', choiceRoutes)
app.use('/answers', answerRoutes)
app.use('/funfacts', funFactRoutes)
console.log(`${process.env.JWT_PRIVATE_KEY}`)

// error management
app.use(errorHandler.errorAuthorisation);
app.use('*', errorHandler.errorRouteHandler);

app.listen(ports, () => console.log(`Listening on port ${ports}`));

//sudo kill -9 $(sudo lsof -t -i:3000)
