
/* ---------- Stored Procedures ------------------  */

DELIMITER $$

/* ----------  AddNotificationToSystem  -------------------------------------------

 --Ex:

	CALL AddNotification (
	1,
    "user",
    "Account Apprved",
    "Congrats! Your Account Have Been Activated"
	);

  -------------------------------------------------------------------------------*/

CREATE PROCEDURE AddNotification (
	IN owner_id INT,
    IN category VARCHAR(255),
    IN title VARCHAR(255),
    IN description TEXT
    )
    BEGIN

        INSERT INTO notifications (
            owner_id,
            category,
            title,
            description)
        VALUES (
            owner_id,
            category,
            title,
            description);

    END$$


/* ----------  AddPaymentToSystem  -------------------------------------------

 --Ex:

	CALL AddPayment (
	1,
    "as65d4w86814456aw@!#45",
    5000,
    "property"
	);

  -------------------------------------------------------------------------------*/

CREATE PROCEDURE AddPayment (
	IN owner_id INT,
    IN transaction_id VARCHAR(255),
    IN amount INT,
    IN type VARCHAR(255)
    )
    BEGIN

        INSERT INTO payments (
            owner_id,
            transaction_id,
            amount,
            type)
        VALUES (
            owner_id,
            transaction_id,
            amount,
            type);

    END$$



/* ----------  AddPropertyToSystem  -------------------------------------------

 --Result Code 0 - It's not the First Property
 --Result Code 1 - It's the First Property

 --Ex:

	CALL IsFirstProperty(1);

  -------------------------------------------------------------------------------*/

CREATE PROCEDURE IsFirstProperty (
	IN owner_id INT
    )
    BEGIN

        DECLARE isFirstProperty INT;
        DECLARE result_code INT;

        SELECT COUNT(*) INTO isFirstProperty
        FROM payments
        WHERE owner_id = owner_id
        AND type = "property";

        IF isFirstProperty > 0 THEN
            SET result_code = 0;
        ELSE
            SET result_code = 1;
        END IF;

        SELECT result_code AS status_code;

    END$$

/* ----------  AddPropertyToSystem  -------------------------------------------

 --Result Code 0 - No Owner found
 --Result Code 1 - Owner Found And Property Added

 --Ex:

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


  -------------------------------------------------------------------------------*/

CREATE PROCEDURE AddProperty (
	IN property_type VARCHAR(50),
    IN name VARCHAR(255),
    IN rental_price INT,
    IN address TEXT,
    IN description TEXT,
    IN amenities VARCHAR(500),
    IN occupancy INT,
    IN proof_doc_url VARCHAR(1000),
    IN distance_from_university INT,
    IN furnishing_essentials VARCHAR(255),
    IN owner_id INT
    )
    BEGIN
        DECLARE owner_exists INT;
        DECLARE result_code INT;

        SELECT COUNT(*) INTO owner_exists
        FROM owners
        WHERE id = owner_id;

        IF owner_exists > 0 THEN

            INSERT INTO properties (
                property_type,
                name,
                rental_price,
                address,
                description,
                amenities,
                occupancy,
                proof_doc_url,
                distance_from_university,
                furnishing_essentials,
                owner_id
            )
            VALUES (
                property_type,
                name,
                rental_price,
                address,
                description,
                amenities,
                occupancy,
                proof_doc_url,
                distance_from_university,
                furnishing_essentials,
                owner_id
            );

            SET result_code = 1;
        ELSE
            SET result_code = 0;
        END IF;

        SELECT result_code AS status_code;

    END$$


/* ----------  AddStudentToSystem  -------------------------------------------

 --Result Code 0 - No Students found
 --Result Code 1 - Student Found And Added
 --Result Code 2 - Student Already Registerd

 --Ex:

	CALL AddStudent(1, 'alice@student.com', 'hashed_password_123');
	CALL AddStudent(4, 'nonexistent@student.com', 'hashed_password_999');

  -------------------------------------------------------------------------------*/

CREATE PROCEDURE AddStudent(
    IN in_student_id VARCHAR(15),
    IN in_student_email VARCHAR(255),
    IN in_student_password VARCHAR(255)
    )
    BEGIN

        DECLARE student_exists INT;
        DECLARE duplicate_exist INT;
        DECLARE result_code INT;

        SELECT COUNT(*) INTO student_exists
        FROM university_students
        WHERE id = in_student_id AND email = in_student_email;



        IF student_exists > 0 THEN

            SELECT COUNT(*) INTO duplicate_exist
            FROM boardingbridge_students
            WHERE student_id = in_student_id;

            IF duplicate_exist > 0 THEN

                SET result_code = 2;
            ELSE

                INSERT INTO boardingbridge_students (student_id, password)
                VALUES (in_student_id, in_student_password);
                SET result_code = 1;
            END IF;
        ELSE
            SET result_code = 0;
        END IF;

        SELECT result_code AS status_code;

    END $$

CREATE PROCEDURE GetStudent(
    IN in_student_id VARCHAR(15)
    )
    BEGIN
        SELECT *
        FROM boardingbridge_students
        WHERE student_id = in_student_id;
    END$$




/* ----------  AddAdminToSystem  -----------------------

 --Result Code 0 - No Staff Member found
 --Result Code 1 - Staff Member Found And Added
 --Result Code 2 - Staff Member Already Registerd

 --Ex:

	CALL AddAdmin(3);

   --------------------------------------------------------*/

CREATE PROCEDURE AddAdmin(
    IN in_staff_id VARCHAR(15)
    )
    BEGIN
        DECLARE staff_exist INT;
        DECLARE duplicate_exist INT;
        DECLARE result_code INT;
        DECLARE staff_nic VARCHAR(255);

        SELECT COUNT(*) INTO staff_exist
        FROM university_staff
        WHERE id = in_staff_id;

        IF staff_exist > 0 THEN

            SELECT COUNT(*) INTO duplicate_exist
            FROM admin
            WHERE staff_id = in_staff_id;

            IF duplicate_exist > 0 THEN
                SET result_code = 2;
            ELSE
                SELECT nic INTO staff_nic
                FROM university_staff
                WHERE id = in_staff_id;

                INSERT INTO admin (staff_id, password)
                VALUES (in_staff_id, staff_nic);

                SET result_code = 1;

            END IF;

        ELSE
            SET result_code = 0;
        END IF;

        SELECT result_code AS status_code;

    END$$

/* ----------  GetAdmin  -----------------------
 --Ex:

	CALL GetAdmin(1);

   --------------------------------------------------------*/

CREATE PROCEDURE GetAdmin(
    IN in_staff_id VARCHAR(15)
    )
    BEGIN
        SELECT *
        FROM admin
        WHERE staff_id = in_staff_id;
    END$$



/* ----------  AddOwnerToSystem  -----------------------

 --Result User ID

 --Ex:

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

   --------------------------------------------------------*/

CREATE PROCEDURE AddOwner(
        IN p_f_name VARCHAR(255),
        IN p_l_name VARCHAR(255),
        IN p_legal_name TEXT,
        IN p_address TEXT,
        IN p_email VARCHAR(255),
        IN p_phone VARCHAR(15),
        IN p_about TEXT,
        IN p_user_name VARCHAR(255),
        IN p_password VARCHAR(255),
        IN p_doc_url TEXT,
        IN p_profile_url VARCHAR(1000)
    )
    BEGIN
        DECLARE default_url VARCHAR(1000) DEFAULT 'https://example.com/default-profile.jpg';

        INSERT INTO owners (
            f_name,
            l_name,
            legal_name,
            address,
            email,
            phone,
            about,
            user_name,
            password,
            doc_url,
            profile_url
        )
        VALUES (
            p_f_name,
            p_l_name,
            p_legal_name,
            p_address,
            p_email,
            p_phone,
            p_about,
            p_user_name,
            p_password,
            p_doc_url,
            COALESCE(p_profile_url, default_url)
        );

        SELECT LAST_INSERT_ID() AS owner_id;

CREATE PROCEDURE GetOwner(
    IN in_user_name VARCHAR(15)
    )
    BEGIN
        SELECT *
        FROM owners
        WHERE user_name = in_user_name;
    END$$

END $$


DELIMITER ;
