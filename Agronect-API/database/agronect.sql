CREATE TABLE `user` (
  `user_id` varchar(16) primary key,
  `name` varchar(100),
  `email` varchar(128) unique,
  `password` varchar(256),
  `role` enum('user', 'admin') DEFAULT 'user',
  `created_at` datetime,
  `updated_at` datetime
);
CREATE TABLE `sharing` (
  `sharing_id` VARCHAR(16) PRIMARY KEY,
  `user_id` VARCHAR(16),
  `name` VARCHAR(100),
  `content` TEXT,
  `imgUrl` VARCHAR(255),
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`)
);


CREATE TABLE `blacklist` (
  `id` bigint AUTO_INCREMENT,
  `token` varchar(500),
  primary key(id)
)
