CREATE TABLE `user` (
  `user_id` varchar(16) primary key,
  `name` varchar(100),
  `email` varchar(128) unique,
  `password` varchar(256),
  `photoProfileUrl` varchar(255),
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

CREATE TABLE predictions (
    id_pred INT PRIMARY KEY,
    image LONGBLOB NOT NULL,
    prediction VARCHAR(255) NOT NULL,
    confidence FLOAT NOT NULL,
    description TEXT,
    solution TEXT,
    user_id VARCHAR(16),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`)
);
