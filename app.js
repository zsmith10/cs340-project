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
        let query2 = "SELECT * FROM Boats;";
        let query3 = "SELECT * FROM Customers";
        let query4 = "SELECT * FROM Sales_Person";

        db.pool.query(query1, function(error, rows, fields){

            let invoices = rows;

            db.pool.query(query2, (error, rows, fields) => {
            
                // Save the boats
                let boats = rows;

                db.pool.query(query3, (error, rows, fields) => {
            
                    // Save the customers
                    let customers = rows;

                    db.pool.query(query4, (error, rows, fields) => {
            
                        // Save the sales people
                        let sales_person = rows;

                        return res.render('invoices.hbs', {data: invoices, boats: boats, customers: customers, sales_person: sales_person});
                           
                    })
                       
                })
                   
            })
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
    query1 = `INSERT INTO Boats (make, model, year, price, date_serviced, serviced_by) VALUES ('${data.make}', '${data.model}', ${data.year}, ${data.price}, '${data.date_serviced}','${data.serviced_by}')`;
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

app.post('/add-customer-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    console.log("customer post called")
    // Capture NULL values
    let zip = parseInt(data.zip);
    if (isNaN(zip))
    {
        zip = 'NULL'
    }


    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (customer_first_name, customer_last_name, address, city, state, zip, phone_number, email) VALUES ('${data.customer_first_name}', '${data.customer_last_name}', '${data.address}', '${data.city}', '${data.state}', ${data.zip},'${data.phone_number}','${data.email}')`;
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
            query2 = `SELECT * FROM Customers;`;
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

app.post('/add-sales-person-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    console.log("sales person post called")
    // Capture NULL values


    // Create the query and run it on the database
    query1 = `INSERT INTO Sales_Person (sales_person_first_name, sales_person_last_name, commission) VALUES ('${data.sales_person_first_name}', '${data.sales_person_last_name}', ${data.commission})`;
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
            query2 = `SELECT * FROM Sales_Person;`;
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


app.post('/add-maintenance-worker-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    console.log("maintenance worker post called")
    // Capture NULL values


    // Create the query and run it on the database
    query1 = `INSERT INTO Maintenance_Workers (maintenance_first_name, maintenance_last_name) VALUES ('${data.maintenance_first_name}', '${data.maintenance_last_name}')`;
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
            query2 = `SELECT * FROM Maintenance_Workers;`;
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
