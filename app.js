const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Corrected line: Use 'sequelize.query' to execute raw SQL queries
sequelize.query('SELECT * FROM product')
    .then(result => {
        console.log(result[0], result[1]);
    })
    .catch(err => {
        console.log(err);
    });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Ensure sequelize.sync() is called and app.listen() starts the server
sequelize.sync()
    .then(result => {
        console.log(result);
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });


