

SELECT boat_id, make, model, year , price, date_serviced, serviced_by FROM Boats
SELECT customer_first_name, customer_last_name, address, city, state, zip, phone_number, email FROM Customers
SELECT sales_person_id, sales_person_first_name, sales_person_last_name, commission FROM Sales_Person
SELECT maintenance_id, maintenance_first_name, maintenance_last_name FROM Maintenance_Workers
SELECT boat_maintenance_id, boat_id, maintenance_id SELECT Boat_Maintenance
SELECT invoice_id, purchase_date, customer_id, sales_person_id, boat_id, price SELECT Sales_Invoices