CREATE TABLE `user` (
  `user_id` varchar(16) primary key,
  `name` varchar(100),
  `email` varchar(128) unique,
  `password` varchar(256),
  `role` enum('user', 'admin') DEFAULT 'user',
  `created_at` datetime,
  `updated_at` datetime
);
CREATE TABLE `discussion` (
  `discussion_id` VARCHAR(16) PRIMARY KEY,
  `user_id` VARCHAR(255),
  'name' VARCHAR(255),
  `content` TEXT,
  `ImgUrl` VARCHAR(255),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`)
  FOREIGN KEY (`name`) REFERENCES `user`(`name`)
);

CREATE TABLE `plant` (
  `plant_id` varchar(16) primary key,
  `name` varchar(50),
  `desc` text
);


CREATE TABLE `disease` (
  `disease_id` varchar(16) primary key,
  `name` varchar(100),
  `desc` text,
  `solution` text null
);

CREATE TABLE `prediction` (
  `prediction_id` varchar(16) primary key,
  `user_id` varchar(255),
  `plant_id` varchar(255),
  `disease_id` varchar(255),
  `images_url` varchar(256),
  `accuration` float(10),
  `created_at` datetime,
  FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  FOREIGN KEY (`plant_id`) REFERENCES `plant` (`plant_id`),
  FOREIGN KEY (`disease_id`) REFERENCES `disease` (`disease_id`)
);

CREATE TABLE `blacklist` (
  `id` bigint AUTO_INCREMENT,
  `token` varchar(500),
  primary key(id)
)
