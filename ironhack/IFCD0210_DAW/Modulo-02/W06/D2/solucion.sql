-- Blog Database Normalization

-- Authors table
CREATE TABLE authors (
    author_id INT PRIMARY KEY AUTO_INCREMENT,
    author_name VARCHAR(100) NOT NULL
);

-- Articles table
CREATE TABLE articles (
    article_id INT PRIMARY KEY AUTO_INCREMENT,
    author_id INT,
    title VARCHAR(255) NOT NULL,
    word_count INT NOT NULL,
    views INT NOT NULL DEFAULT 0,
    FOREIGN KEY (author_id) REFERENCES authors(author_id)
);

-- Insert sample data
INSERT INTO authors (author_name) VALUES
    ('Maria Charlotte'),
    ('Juan Perez'),
    ('Gemma Alcocer');

INSERT INTO articles (author_id, title, word_count, views) VALUES
    (1, 'Best Paint Colors', 814, 14),
    (2, 'Small Space Decorating Tips', 1146, 221),
    (1, 'Hot Accessories', 986, 105),
    (1, 'Mixing Textures', 765, 22),
    (2, 'Kitchen Refresh', 1242, 307),
    (1, 'Homemade Art Hacks', 1002, 193),
    (3, 'Refinishing Wood Floors', 1571, 7542);

-- Airline Database Normalization

-- Customer Status table
CREATE TABLE customer_status (
    status_id INT PRIMARY KEY AUTO_INCREMENT,
    status_name VARCHAR(50) NOT NULL UNIQUE
);

-- Customers table
CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(100) NOT NULL,
    status_id INT,
    total_mileage INT NOT NULL DEFAULT 0,
    FOREIGN KEY (status_id) REFERENCES customer_status(status_id)
);

-- Aircraft types table
CREATE TABLE aircraft_types (
    aircraft_id INT PRIMARY KEY AUTO_INCREMENT,
    aircraft_name VARCHAR(100) NOT NULL,
    total_seats INT NOT NULL
);

-- Flights table
CREATE TABLE flights (
    flight_id INT PRIMARY KEY AUTO_INCREMENT,
    flight_number VARCHAR(10) NOT NULL,
    aircraft_id INT,
    mileage INT NOT NULL,
    FOREIGN KEY (aircraft_id) REFERENCES aircraft_types(aircraft_id)
);

-- Customer Flights (booking) table
CREATE TABLE customer_flights (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    flight_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (flight_id) REFERENCES flights(flight_id)
);

-- Required SQL Queries:

-- 1. Total number of flights in the database
SELECT COUNT(DISTINCT flight_number) as total_flights
FROM flights;

-- 2. Average flight distance
SELECT AVG(mileage) as average_flight_distance
FROM flights;

-- 3. Average number of seats
SELECT AVG(total_seats) as average_seats
FROM aircraft_types;

-- 4. Average miles flown by customers grouped by status
SELECT cs.status_name, AVG(f.mileage) as avg_miles
FROM customer_flights cf
JOIN flights f ON cf.flight_id = f.flight_id
JOIN customers c ON cf.customer_id = c.customer_id
JOIN customer_status cs ON c.status_id = cs.status_id
GROUP BY cs.status_name;

-- 5. Maximum miles flown by customers grouped by status
SELECT cs.status_name, MAX(c.total_mileage) as max_miles
FROM customers c
JOIN customer_status cs ON c.status_id = cs.status_id
GROUP BY cs.status_name;

-- 6. Total number of Boeing aircraft
SELECT COUNT(*) as boeing_count
FROM aircraft_types
WHERE aircraft_name LIKE '%Boeing%';

-- 7. Flights with distance between 300 and 2000 miles
SELECT flight_number, mileage
FROM flights
WHERE mileage BETWEEN 300 AND 2000;

-- 8. Average flight distance by customer status
SELECT cs.status_name, AVG(f.mileage) as avg_flight_distance
FROM customer_flights cf
JOIN flights f ON cf.flight_id = f.flight_id
JOIN customers c ON cf.customer_id = c.customer_id
JOIN customer_status cs ON c.status_id = cs.status_id
GROUP BY cs.status_name;

-- 9. Most booked aircraft by gold status members
SELECT at.aircraft_name, COUNT(*) as booking_count
FROM customer_flights cf
JOIN flights f ON cf.flight_id = f.flight_id
JOIN aircraft_types at ON f.aircraft_id = at.aircraft_id
JOIN customers c ON cf.customer_id = c.customer_id
JOIN customer_status cs ON c.status_id = cs.status_id
WHERE cs.status_name = 'Gold'
GROUP BY at.aircraft_name
ORDER BY booking_count DESC
LIMIT 1;
