INSERT INTO departments (name)
VALUES ('Sales'),
       ('Finance'),
       ('Engineering'),
       ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 3),
       ("Salesperson", 80000, 1),
       ("Software Engineer", 120000, 3),
       ("Acount Manager", 155000, 2),
       ("Accountant", 120000, 2),
       ("Legal Team Lead", 180000, 4),
       ("Lawyer", 160000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Hannibal", "Smith", 1, null),
       ("Face", "Peck", 2, 1),
       ("HM", 'Murdock', 3, 1),
       ("BA", "Baracus", 7, 1),
       ("Rocky", "Squirrel", 6, null),
       ("Bullwinkle", "Moose", 7, 6),
       ("Dick", "Grayson", 4, null)
       ("Tim", "Drake", 5, 7);