var express = require('express');
var app     = express();
PORT        = 27364;

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs.engine({extname: ".hbs"}));
app.set('view engine', '.hbs');

var db = require('./database/db-connector');

// app.js - SETUP section
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));


/*
     GET ROUTES
*/

app.get('/', function(req, res)
    {
        res.render('index.hbs')
    });

app.get('/index', function(req, res)
    {
        res.render('index.hbs')
    });

app.get('/boats', function(req, res)
    {
        let query1 = "SELECT * FROM Boats;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('boats.hbs' , {data: rows});
        })
});

app.get('/customers', function(req, res)
    {
        let query1 = "SELECT * FROM Customers;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('customers.hbs' , {data: rows});
        })
});

app.get('/salespeople', function(req, res)
    {
        let query1 = "SELECT * FROM Sales_Person;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('salespeople.hbs' , {data: rows});
        })
});


app.get('/maintenanceworkers', function(req, res)
    {
        let query1 = "SELECT * FROM Maintenance_Workers;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('maintenanceworkers.hbs' , {data: rows});
        })
});

app.get('/invoices', function(req, res)
    {
        let query1 = "SELECT * FROM Sales_Invoices;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('invoices.hbs' , {data: rows});
        })
});

app.get('/boatmaintenance', function(req, res)
    {
        let query1 = "SELECT * FROM Boat_Maintenance;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('boatmaintenance.hbs' , {data: rows});
        })
});

/*
     ADD ROUTES
*/


app.post('/add-boat-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let boat_id = parseInt(data.boat_id);
    if (isNaN(boat_id))
    {
        boat_id = 'NULL'
    }

    let year = parseInt(data.year);
    if (isNaN(year))
    {
        year = 'NULL'
    }

    let price = parseInt(data.price);
    if (isNaN(price))
    {
        price = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Boats (boat_id, make, model, year, price, date_serviced, serviced_by) VALUES (${data.boat_id}, '${data.make}', '${data.model}', ${data.year}, ${data.price}, '${data.date_serviced}','${data.serviced_by}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Boats;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

/*
     DELETE ROUTES
*/

app.delete('/delete-boat-ajax/', function(req,res,next){
    console.log("Being called")
    let data = req.body;
    let boatID = parseInt(data.id);
    let deleteBoat = `DELETE FROM Boats WHERE boat_id = ?`;
  
          // Run the 1st queryle
          db.pool.query(deleteBoat, [boatID], function(error, rows, fields){
              if (error) {
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                res.sendStatus(204);
              }
  })});


app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
