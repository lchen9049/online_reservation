const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    morgan = require('morgan'),
    app = express();


// For Connecting to PSQL
const { Client } = require('pg');
const conString = "postgres://pevn_admin:pevn1234@localhost/reservation";
const client = new Client({
    connectionString: conString,
});

var ID = function () {
    return Math.random().toString(36).substr(2, 9);
}


app.set('views', __dirname + '/views');

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((cors()));
client.connect();


// ******************* Get all User ***************** // 
app.get('/', function (req, res) {

    client.query('SELECT * FROM users', function (err, result) {
        if (err) {
            return console.log('error running register query', err);
        }
        //sending data to home route
        res.send(result.rows);
        // res.render('index', {users: result.rows});
    });
});



// ******************* REGISTER A NEW USER ***************** // 
app.post('/register', (req, res) => {
    // need - username, password, isAdmin, 
    client.query('SELECT * FROM users WHERE username = $1', [req.body.username], (err, result) => {
        if (err) {
            return console.log('error running login query', err);
        }
        if (result.rows.length > 0) {
            res.send(false);
            return console.log('USER ALREADY EXIST');
        }
        // add user
        client.query('INSERT INTO users(username, password, isadmin) VALUES ($1, $2, $3)',
            [req.body.username, req.body.pword, false]);

        // add Card
        client.query('INSERT INTO credit_card (username, billing_address, card_number, card_pin, city, state, zip_code) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [req.body.username, req.body.billing_address, req.body.card_number, req.body.card_pin, req.body.city, req.body.state, req.body.zipCode]);

        // add customer
        if (req.body.member) {
            client.query('INSERT INTO customers(username, first_name, last_name, car_plate, phone_number, member, spot_id, start_time, end_time, monthly_fee) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
                [req.body.username, req.body.first_name, req.body.last_name, req.body.car_plate, req.body.phone_number, req.body.member, req.body.spotID, req.body.start, req.body.end, req.body.monthlyFee]);

        }
        else {
            client.query('INSERT INTO customers(username, first_name, last_name, car_plate, phone_number, member) VALUES ($1, $2, $3, $4, $5, $6)',
                [req.body.username, req.body.first_name, req.body.last_name, req.body.car_plate, req.body.phone_number, req.body.member]);

        }

        res.send(true);
        return console.log("USER REGISTER SUCCESSFULLY");

    });
});

// ******************* Admin login ***************** // 
app.get('/adminLogin/:uname/:pword', (req, res) => {
    const uname = req.params.uname;
    const pword = req.params.pword;
    const isAdmin = req.params.isAdmin;
    client.query('SELECT * FROM users WHERE username = $1 AND password = $2', [uname, pword], (err, result) => {
        var userData = [];
        if (err) {
            return console.log('error running login query', err);
        }

        if (result.rows.length > 0) {  // user exists
            client.query('SELECT * FROM staff where username = $1', [uname], (err, result) => {
                if (err) {
                    res.send('ERROR IN STAFF')
                    return console.log(' error', err);
                }

                userData.push(result.rows);
                res.send(userData);
            })




        } else {
            res.send(false);
        }
    });

})

// ******************* User login ***************** // 
app.get('/userLogin/:uname/:pword', (req, res) => {
    const uname = req.params.uname;
    const pword = req.params.pword;
    const isAdmin = req.params.isAdmin;
    client.query('SELECT * FROM users WHERE username = $1 AND password = $2', [uname, pword], (err, result) => {
        var userData = [];
        if (err) {
            return console.log('error running login query', err);
        }

        if (result.rows.length > 0) {  // user exists

            client.query('SELECT * FROM customers where username = $1', [uname], (err, result) => {
                if (err) {
                    return console.log(' error', err);
                }

                userData.push(result.rows);
            })

            client.query('SELECT * FROM credit_card where username = $1', [uname], (err, result) => {
                if (err) {
                    return console.log(' error', err);
                }

                userData.push(result.rows);
                res.send(userData);
            })




        } else {
            res.send(false);
        }
    });

})

// ****************  Get all Spots ***************//
app.get('/getAllSpots', (req, res) => {
    client.query('SELECT * FROM spots', (err, result) => {
        if (err) {
            res.send(false);
            return console.log('error retreiving spot query', err);
        }

        res.send(result.rows);
    })
})

// ****************  Get all Users ***************//
app.get('/getAllUsers', (req, res) => {
    client.query('SELECT * FROM customers', (err, result) => {
        if (err) {
            res.send(false);
            return console.log('error retreiving spot query', err);
        }

        res.send(result.rows);
    })
})

// ******************* Input Reservation ***************** // 
app.post('/confirmReservation', (req, res) => {

    client.query('INSERT INTO reservations (spot_id, username, reserve_date, time_start, time_end, total, member, car_plate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [req.body.spotID, req.body.username, req.body.date, req.body.start, req.body.end, req.body.total, req.body.member, req.body.carPlate], (err, result) => {
            if (err) {
                return console.log('FAILED TO INSERT', err);
            }
        })


    res.send(true);
    return console.log('RESERVE SUCCESSFULLY')

})

// ******************* Input Temp Plate ***************** // 
app.post('/addTemp', (req, res) => {

    client.query('INSERT INTO temp_plate (username, plate_number) VALUES ($1, $2)',
        [req.body.username, req.body.plate], (err, result) => {
            if (err) {
                return console.log('FAILED TO INSERT', err);
            }
        })


    res.send(true);
    return console.log('ADD SUCCESSFULLY')

})

// ****************  Get all Reservations ***************//
app.get('/getAllReservation', (req, res) => {
    client.query('SELECT * FROM reservations', (err, result) => {
        if (err) {
            res.send(false);
            return console.log('error retreiving reservation query', err);
        }

        res.send(result.rows);
    })
})




app.listen(3000, function () {
    console.log('Server is running on 3000');
    console.log(ID());

});