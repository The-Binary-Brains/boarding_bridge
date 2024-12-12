/* ---------- Database Creation -------------------------- */
CREATE DATABASE boardingbridge;
USE boardingbridge;


/* ---------- University Students Table ------------------

-> Includes the current students of the university

------------------------------------------------------- */

CREATE TABLE university_students (
    id VARCHAR(15) NOT NULL PRIMARY KEY,
    f_name VARCHAR(255) NOT NULL,
    l_name VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    gender ENUM("male", "female") NOT NULL,
    address TEXT NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    nic VARCHAR(30) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


/* ---------- Boarding Bridge Students Table ------------------

-> Includes the students regiterd to the boarding bridge

------------------------------------------------------- */

CREATE TABLE boardingbridge_students (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    student_id VARCHAR(15) NOT NULL,
    password VARCHAR(255) NOT NULL,
    UNIQUE (student_id),
    FOREIGN KEY (student_id) REFERENCES university_students(id) ON DELETE CASCADE
);

/* ---------- University Staff Table ------------------

-> Includes the current staff members of the university

------------------------------------------------------- */

CREATE TABLE university_staff (
	id VARCHAR(15) NOT NULL PRIMARY KEY,
    f_name VARCHAR(255) NOT NULL,
    l_name VARCHAR(255) NOT NULL,
    department ENUM(
		'Computer Science',
		'Mechanical Engineering',
		'Electrical Engineering',
		'Civil Engineering',
		'Information Technology',
		'Business Administration',
		'Mathematics',
		'Physics',
		'Chemistry') NOT NULL,
    address TEXT NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    nic VARCHAR(30) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* ---------- Admin Table ------------------

-> Includes the admins of the boarding bridge

------------------------------------------------------- */

CREATE TABLE admin (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    staff_id VARCHAR(15) NOT NULL,
    password VARCHAR(255) NOT NULL,
    UNIQUE (staff_id),
    FOREIGN KEY (staff_id) REFERENCES university_staff(id) ON DELETE CASCADE
);

/* ---------- Owners Table ------------------

-> Includes the property owners of the boarding bridge

------------------------------------------------------- */

CREATE TABLE owners (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    f_name VARCHAR(255) NOT NULL,
    l_name VARCHAR(255) NOT NULL,
    legal_name text NOT NULL,
    address TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    about TEXT NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    status ENUM("approved", "pending", "rejected") NOT NULL DEFAULT "pending",
    doc_url TEXT NOT NULL,
    profile_url VARCHAR(1000) NOT NULL
);

/* ---------- Properties Table ------------------

-> Includes the properties of the boarding bridge

------------------------------------------------------- */

CREATE TABLE properties (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    property_type ENUM("room", "house", "annex") NOT NULL,
    name VARCHAR(255) NOT NULL,
    rental_price INT NOT NULL,
    address TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amenities SET(
		"wifi",
        "kitchen",
        "attached_bathrooms",
        "food_arrangement",
        "washing_machine",
        "iron"),
    occupancy INT NOT NULL,
    proof_doc_url VARCHAR(1000) NOT NULL,
    distance_from_university INT NOT NULL,
    furnishing_essentials ENUM("fully_furnished", "semi_furnished", "none") NOT NULL,
    status ENUM("approved", "pending", "in_review", "rejected") NOT NULL DEFAULT "pending",
    owner_id INT NOT NULL,
    views INT DEFAULT 0
    published_at DATE DEFAULT NULL,
    lat INT
    lang INT
    FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE CASCADE
);

/* ---------- Payments Table ------------------

-> Includes the payments made by the property owners

------------------------------------------------------- */

CREATE TABLE payments (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    transaction_id VARCHAR(255) NOT NULL,
    owner_id INT NOT NULL,
    amount INT NOT NULL,
    type ENUM("registration","property") NOT NULL,
    paid_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES owners(id)
);

/* ---------- Notifications Table ------------------

-> Includes notifications of the property owners

------------------------------------------------------- */

CREATE TABLE notifications (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    owner_id INT NOT NULL,
    category ENUM("payment","property", "user", "resercation") NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM("read","unread") NOT NULL DEFAULT "unread",
    FOREIGN KEY (owner_id) REFERENCES owners(id)
);

/* ---------- Property Review Table ------------------

-> holds property review data of properties

------------------------------------------------------- */

CREATE TABLE property_review (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    admin_id INT NOT NULL,
    property_id INT NOT NULL,
    comment TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admin(id),
     FOREIGN KEY (property_id) REFERENCES properties(id)
);

/* ---------- Owner Review Table ------------------

-> holds owner review data of owners

------------------------------------------------------- */

CREATE TABLE owner_review (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    admin_id INT NOT NULL,
    owner_id INT NOT NULL,
    comment TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admin(id),
     FOREIGN KEY (owner_id) REFERENCES owners(id)
);

/* ---------- Owner Review Table ------------------

-> holds owner review data of owners

------------------------------------------------------- */

CREATE TABLE reservations (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    student_id INT NOT NULL,
    property_id INT NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES boardingbridge_students(id),
     FOREIGN KEY (property_id) REFERENCES properties(id)
);

CREATE TABLE images (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    property_id INT NOT NULL,
    url VARCHAR(2000),
     FOREIGN KEY (property_id) REFERENCES properties(id)
);
