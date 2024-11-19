/* ---------- Sample Data Insert-----------------------------------------------------------------------------------------------*/

INSERT INTO university_students (id, f_name, l_name, dob, gender, address, password, email, phone, nic)
VALUES
('S0000010', 'Alice', 'Johnson', '2000-05-15', 'female', '123 University Rd, Cityville', 'hashed_password_123', 'alice@student.com', '0771234567', '123456789V'),
('S0000020','Bob', 'Smith', '1999-08-25', 'male', '456 College Ave, Townplace', 'hashed_password_456', 'bob@student.com', '0772345678', '987654321V'),
('S0000030','Charlie', 'Brown', '2001-02-10', 'male', '789 School St, Metropolis', 'hashed_password_789', 'charlie@student.com', '0773456789', '234567890V');

INSERT INTO university_staff (id, f_name, l_name, department, address, password, email, phone, nic)
VALUES
('UNS11111','John', 'Doe', 'Computer Science', '1234 Elm Street, City, Country', 'hashed_password_here', 'john.doe@example.com', '123-456-7890', '123456789V'),
('UNS22222','Jane', 'Smith', 'Mechanical Engineering', '5678 Oak Avenue, City, Country', 'hashed_password_here', 'jane.smith@example.com', '987-654-3210', '987654321V'),
('UNS33333','Alice', 'Johnson', 'Electrical Engineering', '9101 Pine Road, City, Country', 'hashed_password_here', 'alice.johnson@example.com', '555-555-5555', '112233445V'),
('UNS44444','Bob', 'Brown', 'Information Technology', '1122 Maple Lane, City, Country', 'hashed_password_here', 'bob.brown@example.com', '333-444-5555', '223344556V');

CALL AddAdmin(1);

CALL AddStudent(1, 'alice@student.com', 'hashed_password_123');

CALL AddOwner(
    'Bob',
    'Johnson',
    'Johnson Properties',
    '123 Pine Avenue',
    'bob.johnson@example.com',
    '5559876543',
    'Offering affordable accommodations near universities.',
    'bobjohnson',
    'password123',
    'https://example.com/documents/bob.pdf',
    NULL);

CALL AddProperty(
    'room',
    'Cozy Room',
    15000,
    '123 University Street, Cityville',
    'A room with all basic amenities.',
    'wifi,kitchen',
    2,
    'https://example.com/proofs/property123.pdf',
    500,
    'fully_furnished',
    1);

CALL AddPayment (
	1,
    "as65d4w86814456aw@!#45",
    5000,
    "property"
	);

CALL AddPayment (
	1,
    "as65d4w86814456aw@!#45",
    5000,
    "registration"
	);

CALL isFirstProperty(1);

/* ------------------------------------------------------------------------------------------------------------------------------- */
