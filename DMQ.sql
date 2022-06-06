-- User input will be indicated with a :

-- Show all Boats on Boats page
SELECT * FROM Boats;

-- Show all Customers on Customers page
SELECT * FROM Customers;

-- Show all Salespeople on Salespeople page
SELECT * FROM Sales_Person;

-- Show all Maintenance Workers on Maintenace Workers page
SELECT * FROM Maintenance_Workers;

-- Show all Invoices on Invoices page
SELECT * FROM Sales_Invoices;

-- Show all Boat Maintenances on Boat Maintenance page
SELECT * FROM Boat_Maintenance;

-- Add new Boat 
INSERT INTO Boats (
    make,
    model,
    year,
    price,
    date_serviced,
    serviced_by
)
VALUES
(
    :make,
    :model,
    :year,
    :price,
    :date_serviced,
    :serviced_by
);

-- Add new Customer
INSERT INTO Customers (
    customer_first_name,
    customer_last_name,
    address,
    city,
    state,
    zip,
    phone_number,
    email
)
VALUES
(
    :customer_first_name,
    :customer_last_name,
    :address,
    :city,
    :state,
    :zip,
    :phone_number,
    :email
);

-- Add new Salesperson
INSERT INTO Sales_Person (
    sales_person_first_name,
    sales_person_last_name.
    commission
)
VALUES
(
    :sales_person_first_name,
    :sales_person_last_name,
    :commission
);

-- Add new Maintenance Worker
INSERT INTO Maintenance_Workers (
    maintenance_first_name,
    maintenance_last_name
)
VALUES
(
    :maintenance_first_name,
    :maintenance_last_name
);

-- Add new Invoices
INSERT INTO Sales_Invoices (
    date,
    customer_id,
    sales_person_id,
    boat_id,
    price
)
VALUES
(
    :date,
    :customer_id,
    :sales_person_id,
    :boat_id,
    :price
);

-- Add new Boat Maintenance
INSERT INTO Boat_Maintenance (
    boat_id,
    maintenance_id
)
VALUES
(
    :boat_id,
    :boat_maintenance_id
);

-- Edit Boat
UPDATE Boats
SET make = :make, mode = :model, year = :year, price = :price, date_serviced = :date_serviced, serviced_by = :serviced_by
WHERE boat_id = :boat_id;

-- Edit Customer
UPDATE Customers
SET customer_first_name = :customer_first_name, customer_last_name = :customer_last_name, 
address = :address, city = :city, state = :state, zip = :zip, phone_number = :phone_number, email = :email
WHERE customer_id = :customer_id;

-- Edit Salesperson
UPDATE Sales_Person
SET sales_person_first_name = :sales_person_first_name, sales_person_last_name = :sales_person_last_name, commission = :commission
WHERE sales_person_id = :sales_person_id;

-- Edit Maintenance Worker
UPDATE Maintenance_Workers
SET maintenance_first_name = :maintenance_first_name, maintenance_last_name = :maintenance_last_name
WHERE maintenance_id = :maintenance_id;

-- Edit Invoices
UPDATE Sales_Invoices
SET date = :date, customer_id = :customer_id, sales_person_id = :sales_person_id, boat_id = :boat_id, price = :price
WHERE invoice_id = :invoice_id;

-- Edit Boat Maintenance
UPDATE Boat_Maintenance
SET boat_id = :boat_id, maintenance_id = :maintenance_id
WHERE boat_maintenance_id = :boat_maintenance_id;

-- Delete Boat
DELETE FROM Boats WHERE boat_id = :boat_id;

-- Delete Customer
DELETE FROM Customers WHERE customer_id = :customer_id;

-- Delete Salesperson
DELETE FROM Sales_Person WHERE sales_person_id = :sales_person_id;

-- Delete Maintenance Worker
DELETE FROM Maintenance_Workers WHERE maintenance_id = :maintenance_id;

-- Delete Invoice
DELETE FROM Sales_Invoices WHERE invoice_id = :invoice_id;

-- Delete Boat Maintenance
DELETE FROM Boat_Maintenance WHERE boat_maintenance_id = :boat_maintenance_id;

-- Calculte Commission for Salespeople
SELECT SUM(price * .10) AS commission FROM Sales_Invoices
WHERE sales_person_id = :sales_person_id;

-- Show all Customer IDs for adding Invoices through a dropdown to be implemented later
SELECT customer_id FROM Customers;

-- Show all Salespeople IDs for adding Invoices through a dropdown to be implemented later
SELECT sales_person_id FROM Sales_Person;

-- Show all Boat IDs for adding Invoices and/or Boat Maintenance through a dropdown to be implemented later
SELECT boat_id FROM Boats;

-- Show all Maintenance IDs for adding Boat Mainteance through a dropdown to be implemented later
SELECT maintenance_id FROM Maintenance_Workers;

-- Show Maintenance Workers for a given name
SELECT maintenance_id FROM Maintenance_Workers WHERE maintenance_first_name = :maintenance_first_name;

-- Search filter for finding Boats to be implemented later
SELECT * FROM Boats WHERE user_input = :user_input;