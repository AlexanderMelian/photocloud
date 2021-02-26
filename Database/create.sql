--MySql 5.7


CREATE DATABASE PhotoCloud;


USE PhotoCloud;



CREATE TABLE `User`(
    `user_id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `username` VARCHAR(10) NOT NULL,
    `password` VARCHAR(30) NOT NULL,
    `edit` TINYINT(1) NOT NULL DEFAULT 0
);

--INSERT INTO User (`username`) VALUES("visita");