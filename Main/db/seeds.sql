INSERT INTO department (name)
VALUES ("Beverage"), 
("Resgister"),
("Merch"),
("Tech");

INSERT INTO role (title, salary, department_id)
VALUES ("Shelf Stocker", 30000, 1),
("Shelf Stocker Manager", 60000, 1),
("Checkout Advocate", 32000, 2),
("Checkout Advocate Manager", 60000, 2),
("Clothes Supplier", 48000, 3),
("Clothes Supplier Manager", 60000, 3),
("Cellular Device", 55000, 4),
("Cellular Device Manager", 70000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Maeve","Olson", 1),
("Stefan","Pennington", 2),
("Charlotte","Wise", 3),
("Cai","Neill", 4),
("Wanda","Barlow", 5),
("Jago","Greer", 6),
("Louise","Suarez", 7),
("Gail","Rowe", 8);