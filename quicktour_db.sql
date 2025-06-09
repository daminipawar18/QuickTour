-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: quicktour_db
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ride_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `seats_booked` int NOT NULL,
  `status` enum('pending','confirmed','cancelled','started','Accepted','Rejected','Ongoing','Completed') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `driver_id` int NOT NULL,
  `otp` int NOT NULL,
  `driver_name` varchar(255) DEFAULT NULL,
  `driver_phone` varchar(20) DEFAULT NULL,
  `vehicle` varchar(255) DEFAULT NULL,
  `from_location` varchar(255) DEFAULT NULL,
  `to_location` varchar(255) DEFAULT NULL,
  `ride_date` date DEFAULT NULL,
  `ride_time` time DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `otp_attempts` int DEFAULT '0',
  `ride_status` enum('pending','accepted','started','completed') DEFAULT 'pending',
  `otp_verified` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `ride_id` (`ride_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (135,16,16,1,'started','2025-04-18 14:06:25',16,4434,'Ritika',NULL,'Maruti Swift - MH01 AB 4321','Pune','Nashik','2025-04-18','19:36:25',1300.00,0,'pending',0),(136,16,16,1,'started','2025-04-18 14:26:08',16,2753,'Ritika',NULL,'Maruti Swift - MH01 AB 4321','Pune','Nashik','2025-04-18','19:56:08',1300.00,0,'pending',0),(137,16,15,1,'started','2025-04-18 14:42:56',16,7611,'Ritika',NULL,'Maruti Swift - MH01 AB 4321','Pune','Nashik','2025-04-18','20:12:56',1300.00,0,'pending',0),(138,16,16,1,'started','2025-04-18 14:53:44',16,7425,'Ritika',NULL,'Maruti Swift - MH01 AB 4321','Pune','Nashik','2025-04-18','20:23:44',1300.00,0,'pending',0),(139,16,16,1,'started','2025-04-18 15:01:26',16,4619,'Ritika',NULL,'Maruti Swift - MH01 AB 4321','Pune','Nashik','2025-04-18','20:31:26',1300.00,0,'pending',0),(140,16,16,1,'started','2025-04-18 15:04:34',16,9235,'Ritika',NULL,'Maruti Swift - MH01 AB 4321','Pune','Nashik','2025-04-18','20:34:34',1300.00,0,'pending',0),(141,16,16,1,'started','2025-04-18 15:17:18',16,5190,'Ritika',NULL,'Maruti Swift - MH01 AB 4321','Pune','Nashik','2025-04-18','20:47:18',1300.00,0,'pending',0),(142,1,16,1,'started','2025-04-18 15:41:45',1,6269,'Damini Prakash Pawar',NULL,'Toyota Innova - MH12 AB 1234','Pune','Nashik','2025-04-18','21:11:45',1200.00,0,'pending',0),(143,1,1,2,'started','2025-04-18 16:12:00',1,3306,'Damini Prakash Pawar',NULL,'Toyota Innova - MH12 AB 1234','Pune','Nashik','2025-04-18','21:42:00',1200.00,0,'pending',0),(144,1,1,1,'started','2025-04-18 16:23:00',1,4859,'Damini Prakash Pawar',NULL,'Toyota Innova - MH12 AB 1234','Pune','Nashik','2025-04-18','21:53:00',1200.00,0,'pending',0),(145,16,1,1,'started','2025-04-18 16:29:22',16,6380,'Ritika',NULL,'Maruti Swift - MH01 AB 4321','Pune','Nashik','2025-04-18','21:59:22',1300.00,0,'pending',0),(146,16,16,1,'started','2025-04-18 16:31:56',16,5876,'Ritika',NULL,'Maruti Swift - MH01 AB 4321','Pune','Nashik','2025-04-18','22:01:56',1300.00,0,'pending',0),(147,16,16,1,'started','2025-04-18 16:42:45',16,3358,'Ritika',NULL,'Maruti Swift - MH01 AB 4321','Pune','Nashik','2025-04-18','22:12:45',1300.00,0,'pending',0),(148,1,16,1,'started','2025-04-18 16:50:37',1,8146,'Damini Prakash Pawar',NULL,'Toyota Innova - MH12 AB 1234','Pune','Nashik','2025-04-18','22:20:37',1200.00,0,'pending',0),(149,1,1,1,'started','2025-04-18 16:56:47',1,8221,'Damini Prakash Pawar',NULL,'Toyota Innova - MH12 AB 1234','Pune','Nashik','2025-04-18','22:26:47',1200.00,0,'pending',0),(150,1,1,1,'started','2025-04-18 17:04:44',1,7643,'Damini Prakash Pawar',NULL,'Toyota Innova - MH12 AB 1234','Pune','Nashik','2025-04-18','22:34:44',1200.00,0,'pending',0),(151,16,17,1,'Accepted','2025-04-19 04:55:17',16,8196,'Ritika',NULL,'Maruti Swift - MH01 AB 4321','Pune','Nashik','2025-04-19','10:25:17',1300.00,0,'pending',0),(152,16,16,1,'started','2025-04-19 04:56:15',16,4147,'Ritika',NULL,'Maruti Swift - MH01 AB 4321','Pune','Nashik','2025-04-19','10:26:15',1300.00,0,'pending',0),(153,16,17,2,'started','2025-04-19 07:09:57',16,1576,'Ritika',NULL,'Maruti Swift - MH01 AB 4321','Pune','Nashik','2025-04-19','12:39:57',1300.00,0,'pending',0),(154,16,15,1,'started','2025-05-22 06:10:14',16,5377,'Ritika',NULL,'Maruti Swift - MH01 AB 4321','Pune','Nashik','2025-05-22','11:40:14',1300.00,0,'pending',0),(155,16,15,1,'started','2025-06-07 15:31:29',16,8618,'Ritika',NULL,'Maruti Swift - MH01 AB 4321','Pune','Nashik','2025-06-07','21:01:29',1300.00,0,'pending',0),(156,16,16,1,'started','2025-06-07 15:44:33',16,1950,'Ritika',NULL,'Maruti Swift - MH01 AB 4321','Pune','Nashik','2025-06-07','21:14:33',1300.00,0,'pending',0),(157,16,15,1,'started','2025-06-07 15:50:15',16,7877,'Ritika',NULL,'Maruti Swift - MH01 AB 4321','Pune','Nashik','2025-06-07','21:20:15',1300.00,0,'pending',0),(158,16,16,1,'started','2025-06-07 17:09:25',16,2704,'Ritika',NULL,'Maruti Swift - MH01 AB 4321','Pune','Nashik','2025-06-07','22:39:25',1300.00,0,'pending',0);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drivers`
--

DROP TABLE IF EXISTS `drivers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `drivers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `vehicle` varchar(50) NOT NULL,
  `license_number` varchar(50) NOT NULL,
  `from_location` varchar(100) NOT NULL,
  `to_location` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `available_seats` int NOT NULL,
  `rating` float DEFAULT '5',
  `status` enum('available','unavailable') DEFAULT 'available',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `license_number` (`license_number`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drivers`
--

LOCK TABLES `drivers` WRITE;
/*!40000 ALTER TABLE `drivers` DISABLE KEYS */;
INSERT INTO `drivers` VALUES (1,'Rajesh Sharma','9876543210','Toyota Innova','MH12AB1234','Pune','Mumbai',600.00,3,4.8,'available','2025-03-23 10:27:48','2025-03-23 10:27:48'),(2,'Amit Patel','8765432109','Honda City','MH14XY5678','Nashik','Aurangabad',500.00,2,4.5,'available','2025-03-23 10:27:48','2025-03-23 10:27:48'),(3,'Sneha Verma','7654321098','Swift Dzire','MH13CD3456','Mumbai','Pune',550.00,4,4.7,'available','2025-03-23 10:27:48','2025-03-23 10:27:48'),(5,'Rahul Sharma','9988776655','Hyundai Creta','MH15AB1122','Nashik','Mumbai',1500.00,3,5,'available','2025-03-23 10:56:11','2025-03-23 10:56:11'),(6,'Priya Desai','9877665544','Maruti Ertiga','MH16XY3344','Aurangabad','Nagpur',1200.00,4,5,'available','2025-03-23 10:56:11','2025-03-23 10:56:11'),(7,'Vikas Yadav','9766554433','Ford EcoSport','MH17CD5566','Pune','Nashik',1000.00,2,5,'available','2025-03-23 10:56:11','2025-03-23 10:56:11');
/*!40000 ALTER TABLE `drivers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ride_requests`
--

DROP TABLE IF EXISTS `ride_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ride_requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `driver_id` int NOT NULL,
  `rider_id` int NOT NULL,
  `from_location` varchar(255) NOT NULL,
  `to_location` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` enum('Pending','Confirmed','Completed','Cancelled') DEFAULT 'Pending',
  `otp` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `driver_id` (`driver_id`),
  KEY `rider_id` (`rider_id`),
  CONSTRAINT `ride_requests_ibfk_1` FOREIGN KEY (`driver_id`) REFERENCES `drivers` (`id`),
  CONSTRAINT `ride_requests_ibfk_2` FOREIGN KEY (`rider_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ride_requests`
--

LOCK TABLES `ride_requests` WRITE;
/*!40000 ALTER TABLE `ride_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `ride_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rides`
--

DROP TABLE IF EXISTS `rides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rides` (
  `id` int NOT NULL AUTO_INCREMENT,
  `driver_id` int NOT NULL,
  `from_location` varchar(255) NOT NULL,
  `from_latitude` decimal(10,8) DEFAULT NULL,
  `from_longitude` decimal(11,8) DEFAULT NULL,
  `to_location` varchar(255) NOT NULL,
  `to_latitude` decimal(10,8) DEFAULT NULL,
  `to_longitude` decimal(11,8) DEFAULT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `available_seats` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `status` enum('available','booked','completed') DEFAULT 'available',
  `ride_type` enum('single','recurring') DEFAULT 'single',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `otp_verified` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `driver_id` (`driver_id`),
  KEY `idx_from_location` (`from_location`),
  KEY `idx_to_location` (`to_location`),
  CONSTRAINT `rides_ibfk_1` FOREIGN KEY (`driver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `rides_chk_1` CHECK ((`available_seats` >= 0)),
  CONSTRAINT `rides_chk_2` CHECK ((`price` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rides`
--

LOCK TABLES `rides` WRITE;
/*!40000 ALTER TABLE `rides` DISABLE KEYS */;
INSERT INTO `rides` VALUES (1,1,'Pune',18.52040000,73.85670000,'Nashik',19.99750000,73.78980000,'2025-03-06','10:00:00',1,500.00,'completed','single','2025-03-05 18:34:54','2025-03-23 10:07:09',0),(2,2,'Mumbai',19.07600000,72.87770000,'Pune',18.52040000,73.85670000,'2025-03-06','12:30:00',2,600.00,'available','single','2025-03-05 18:34:54','2025-03-05 18:34:54',0),(3,3,'Nashik',19.99750000,73.78980000,'Aurangabad',19.87620000,75.34330000,'2025-03-07','09:00:00',3,400.00,'available','single','2025-03-05 18:34:54','2025-03-23 10:15:21',0);
/*!40000 ALTER TABLE `rides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `role` enum('user','driver') NOT NULL,
  `mobile_no` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `car_number` varchar(20) DEFAULT NULL,
  `driver_license_number` varchar(50) DEFAULT NULL,
  `aadhaar_number` varchar(12) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `driver_display_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobile_no` (`mobile_no`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Damini Prakash Pawar','driver','09156889193','damupawar2000@gmail.com','$2b$10$iDQsDkpDWvxC.Ptmh5kKmeRkwX2iHcyau96r2mFw54Yo7u/P7bVNC',NULL,NULL,NULL,'2025-03-04 16:52:18','Driver Damini'),(2,'Rushabh jejurkar','user','+917757898863','rushabhjejurkar123@gmail.com','$2b$10$8vx4/Dn0LFRs5PZT0JXybuxBfHW0IbZRvzB1gFfgWihciRFPegnmW',NULL,NULL,NULL,'2025-03-04 17:29:55',NULL),(3,'Prajakta marnar','user','+911234567889','prajaktamarnar@123gmail.com','$2b$10$M/Brnx65JBZGTGbnHPrcwO5C27F4kMrYrOxfoAFoXLvTFOiqeKapa',NULL,NULL,NULL,'2025-03-05 04:42:54',NULL),(4,'Damini Prakash Pawar','user','+919156889193','priya2000@gmail.com','$2b$10$ZimqSotlRP2j4fr8/jOQX.VdhbQ2UdDvM.J2bo.REC99NqCKfHlDK',NULL,NULL,NULL,'2025-03-05 10:08:17',NULL),(6,'sameesh','driver','+9881563082','sameesh2000@gmail.com','$2b$10$TssVgjojDYyt1EAS7riOxuA17TFKCWYavwRkOeWAGOfz0Ynen.k9y',NULL,NULL,NULL,'2025-03-05 10:18:00','Driver Damini'),(7,'rushab','driver','+7757889834','rushhh12345@gmail.com','$2b$10$Yi1y8CEDGupHtJyHMxAfV.qmkrHyFF90xPkoniGbvEmv9mQS1Q6La',NULL,NULL,NULL,'2025-03-05 10:19:26','Driver Damini'),(8,'golu','user','+919881563082','golupatil123@gmail.com','$2b$10$SzPrGyMbXTrZPkFvoXbza.bDddMwJHv6c0CyQU/LEp096xe47IHUq',NULL,NULL,NULL,'2025-03-17 12:44:26',NULL),(11,'Rashi ','user','+911234567891','rashii123@gmail.com','$2b$10$B1k1Ip9IH0weZdVImjK5OOo4g2IglcVl35shMCU16uWOC4d5KvlSu',NULL,NULL,NULL,'2025-03-17 12:47:27',NULL),(12,'rushiii','user','+911234123456','rushi123@gmail.com','$2b$10$5VrpGD8497UbwnNNBKToauvOAxAXoS0XdhHN5ZsRoQ83DsqXZsJ.i',NULL,NULL,NULL,'2025-03-17 12:57:51',NULL),(13,'dfytyyuh','user','+911357912345','damuuuppawar2000@gmail.com','$2b$10$F7AmuIbAhSTzz5Vn6cVwX..9HY2XSuwS.O5lTVv96mVe0maU8a0fG',NULL,NULL,NULL,'2025-03-18 12:37:05',NULL),(14,'Priyanka ','user','+919604321292','priyanka602@gmail.com','$2b$10$AFpgflaOYzZJz1f35SAZwuCK0Qk.t3Yy1.JW/oLGwcubzWpx/TAGi',NULL,NULL,NULL,'2025-03-19 10:02:28',NULL),(15,'Rutuja ','user','+917066224012','rutujapawar2000@gmail.com','$2b$10$W0w7pP4.q8E1/ymy2j/SF.Ah0Ma0I/c2PiOy8PmL1Io7lS8LJymdm',NULL,NULL,NULL,'2025-03-19 10:30:42',NULL),(16,'Ritika','driver','+919876543216','ritikaaher1234@gmail.com','$2b$10$JTjXpy7.Hz4DwkkJpdK6Mu1RjYIBdhlrr/jWV5BgZR31LC2/mXUYq',NULL,NULL,NULL,'2025-03-22 16:59:03',NULL),(17,'Sayali ','user','+918765432198','sayalirajesh1234@gmail.com','$2b$10$ilPxy8OO71dR.GVzswbusOcpAavSUCnM7aCZFxoJkLOeXEizAczoG',NULL,NULL,NULL,'2025-03-25 09:08:07',NULL),(18,'rajas','user','+918765431289','rajaspatil123@gmail.com','$2b$10$Gaeo.Y2RiEK2MPy6wgvz9ef4peOW6erFDwjQx/.XsEPNH3O3nQyE6',NULL,NULL,NULL,'2025-03-31 15:34:17',NULL),(19,'Rajashree','user','+919876543321','rajashreeaher2001@gmail.com','$2b$10$3CEA6tVaXM08M9GNnVDn5.SddJZw5KnnxiXifdUYHVSVQLzsF.816',NULL,NULL,NULL,'2025-04-02 14:51:18',NULL),(20,'Anmol','driver','+917654689342','anmolpatil1990@gmail.com','$2b$10$f470sMi0IS1Cx0gdX0RTz.HOjruJXFk1UiQp4hzj0QjBx6hrGK/Eu',NULL,NULL,NULL,'2025-04-02 14:54:45',NULL),(21,'Test','user','+911234567890','test@example.com','$2b$10$3sbrNWKK/aX8wsqcXoxwQ.NlLra7m1A3pkWOENbKAtPBTkE2WvzO.',NULL,NULL,NULL,'2025-04-03 04:27:26',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-09 16:02:05
