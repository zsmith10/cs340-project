SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;


CREATE TABLE `Boats` (

    `boat_id` int(11) NOT NULL AUTO_INCREMENT,
    `make` varchar(50) DEFAULT NULL,
    `model` varchar(50) DEFAULT NULL,
    `year` int DEFAULT NULL,
    `price` int DEFAULT NULL,
    `date_serviced` date DEFAULT NULL,
    `serviced_by` varchar(50) DEFAULT NULL,

    PRIMARY KEY(`boat_id`)

) ENGINE=InnoDB;


CREATE TABLE `Customers` (

    `customer_id` int(11) NOT NULL AUTO_INCREMENT,
    `customer_first_name` varchar(50) DEFAULT NULL,
    `customer_last_name` varchar(50) DEFAULT NULL,
    `address` varchar(50) DEFAULT NULL,
    `city` varchar(50) DEFAULT NULL,
    `state` varchar(50) DEFAULT NULL,
    `zip` int DEFAULT NULL,
    `phone_number` varchar(50) DEFAULT NULL,
    `email` varchar(50) DEFAULT NULL,

    PRIMARY KEY(`customer_id`)

) ENGINE=InnoDB;


CREATE TABLE `Sales_Person` (

    `sales_person_id` int(11) NOT NULL AUTO_INCREMENT,
    `sales_person_first_name` varchar(50) DEFAULT NULL,
    `sales_person_last_name` varchar(50) DEFAULT NULL,
    `commission` int DEFAULT NULL,

    PRIMARY KEY(`sales_person_id`)

) ENGINE=InnoDB;


CREATE TABLE `Maintenance_Workers` (

    `maintenance_id` int(11) NOT NULL AUTO_INCREMENT,
    `maintenance_first_name` varchar(50) DEFAULT NULL,
    `maintenance_last_name` varchar(50) DEFAULT NULL,

    PRIMARY KEY(`maintenance_id`)

) ENGINE=InnoDB;


CREATE TABLE `Boat_Maintenance` (

    `boat_maintenance_id` int(11) NOT NULL AUTO_INCREMENT,
    `boat_id` int(50) DEFAULT NULL,
    `maintenance_id` int(50) DEFAULT NULL,

    PRIMARY KEY(`boat_maintenance_id`),

    FOREIGN KEY (boat_id) REFERENCES Boats(boat_id),
    FOREIGN KEY (maintenance_id) REFERENCES Maintenance_Workers(maintenance_id)

) ENGINE=InnoDB;


CREATE TABLE `Sales_Invoices` (

    `invoice_id` int(11) NOT NULL AUTO_INCREMENT,
    `date` date DEFAULT NULL,
    `customer_id` int DEFAULT NULL,
    `sales_person_id` int DEFAULT NULL,
    `boat_id` int DEFAULT NULL,
    `price` int DEFAULT NULL,
    
    PRIMARY KEY(`invoice_id`),

    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (sales_person_id) REFERENCES Sales_Person(sales_person_id),
    FOREIGN KEY (boat_id) REFERENCES Boats(boat_id)

) ENGINE=InnoDB;




INSERT INTO `Boats` (`boat_id`, `make`, `model`, `year` , `price`, `date_serviced`, `serviced_by`) 
VALUES  (1, 'Vessa', '2B', 2012 ,300000, '2022-01-05', 'Ron'),
        (2, 'Vessa', '2B', 2013 ,313000, '2022-01-17', 'Ron' ),
        (3, 'Rider', '3FT', 2017 ,537000, '2022-02-23', 'Sam' ),
        (4, 'Star' , '12T', 2020 ,833000, '2022-03-20', 'Donny');

INSERT INTO `Customers` (`customer_id`, `customer_first_name`, `customer_last_name`, `address`, `city`, `state`, `zip`, `phone_number`, `email`)
VALUES  (1, 'Grant', 'Chambers', '432 N 13 Street', 'Miami', 'Florida', 33125, '360-521-0973', 'gcham@gmail.com'),
        (2, 'Phil',  'Smith', '1123 SW Stratford Court', 'Austin', 'Texas', 73301, '314-159-2653', 'smithphi1@gmail'),
        (3, 'Joe','Jones', '6538 S Dallas Avenue', 'Portland', 'Oregon', 97207, '503-713-6822', 'jones333@yahoo.com'),
        (4, 'Noah','Karnopp', '1207 NW Jackson Avenue', 'Corvallis', 'Oregon', 97330, '971-223-1515', 'noahk00@gmail.com');

INSERT INTO `Sales_Person` (`sales_person_id`, `sales_person_first_name`, `sales_person_last_name`, `commission`) 
VALUES  (1, 'Daniel','Melendez',30000),   
        (2, 'Connor', 'Yowell', 53700 ),
        (3, 'Leah','Tate', 0),
        (4, 'Hannah', 'Plummer', 31300);

INSERT INTO `Maintenance_Workers` (`maintenance_id`, `maintenance_first_name`, `maintenance_last_name`)
VALUES  (1, 'Sam','Knox'),
        (2, 'Ron', 'Nieting'),
        (3, 'Donny','Robertson');

INSERT INTO `Boat_Maintenance` (`boat_maintenance_id`, `boat_id`, `maintenance_id`)
VALUES  (1, 1, 2),
        (2, 2, 2),
        (3, 3, 1),
        (4, 4, 3);

INSERT INTO `Sales_Invoices` (`invoice_id`, `date`, `customer_id`, `sales_person_id`, `boat_id`, `price`)
VALUES  (1, '2022-03-13', 1, 1, 1, 30000),
        (2, '2022-04-02', 4, 2, 3, 53700),
        (3, '2022-03-27', 2, 4, 2, 31300);



SET FOREIGN_KEY_CHECKS=1;
COMMIT;