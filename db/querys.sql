-- SELECT employees.id, employees.first_name, employees.last_name, title, 
-- department_name AS Deparment, 
-- CONCAT(managers.first_name, " ", managers.last_name) AS Manager
-- FROM roles JOIN employees ON roles.id = employees.role_id JOIN departments ON departments.id = roles.department_id
-- LEFT JOIN employees AS managers ON managers.id = employees.manager_id
-- ORDER BY employees.id;

-- SELECT title, salary, department_name AS Department FROM roles JOIN departments ON departments.id = roles.department_id;

UPDATE employees SET role_id=5 WHERE employees.id=9;