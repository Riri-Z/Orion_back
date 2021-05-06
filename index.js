const express = require('express');
const app = express();
const ports = process.env.PORT || 3000;
const errorController = require('./controllers/error');

// parser
app.use(express.urlencoded({extended: true}));
app.use(express.json())

// routes access
const usersRoutes = require('./routes/user.routes.js');
const gendersRoutes = require('./routes/gender.routes.js');
const rolesRoutes = require('./routes/role.routes.js');
const userRolesRoutes = require('./routes/role.user.routes.js');
const groupeRoutes = require('./routes/groupe.routes.js');

app.use('/users', usersRoutes);
app.use('/genders', gendersRoutes);
app.use('/roles', rolesRoutes);
app.use('/user-roles', userRolesRoutes);
app.use('/groupes', groupeRoutes);


// error management
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})
app.use(errorController.get404);
app.use(errorController.get500);


app.listen(ports, () => console.log(`Listening on port ${ports}`));

//sudo kill -9 $(sudo lsof -t -i:3000)
