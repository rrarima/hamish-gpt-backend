CREATE DATABASE  IF NOT EXISTS `hamishgpt` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hamishgpt`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hamishgpt
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'eps','rarimar4@gmail.com','$2b$10$zzaew/e1pyNhMAtO6ZOeTu5EvwobdZg9ZRPeWNoo6K5zvlhkAqwjS','2023-06-15 11:49:32','2023-06-15 11:49:32'),(8,'test','rarimar@outlook.com','$2b$10$SAJivPAU7CUPrNkEDy2Z9.Rg2o1TC5JsLQ5aUhBemi/hJ8cOR6grm','2023-06-18 08:20:09','2023-06-18 08:20:09'),(14,'test1','rarimar1@outlook.com','$2b$10$WQSpxmuVYk/iKkSYXXdUfuf/WvwaaGY47vFnMFq8mKGo1e1ATq8U6','2023-06-20 02:00:53','2023-06-20 02:00:53');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `imageid` int NOT NULL AUTO_INCREMENT,
  `userid` int DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  `image_description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`imageid`),
  KEY `userid` (`userid`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,1,'https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQbxKU661kNI0m7Yw0xBW5SrN5Uc56_8cq4t4OhaYMXIvPhIgJo8v7H2d3PDtIDsfQt','A Girrafe'),(2,1,'https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRJpevBOQMgZ-Gaeb54y2Tin-o5vsoOtYW2nYtCpzkYqtj6ENWsHD4d1Bv-AUymOggA','A Lion'),(3,1,'https://upload.wikimedia.org/wikipedia/commons/3/3f/Walking_tiger_female.jpg','A Tiger'),(4,1,'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Southern_right_whale.jpg/220px-Southern_right_whale.jpg','A Whale'),(5,8,'https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRJpevBOQMgZ-Gaeb54y2Tin-o5vsoOtYW2nYtCpzkYqtj6ENWsHD4d1Bv-AUymOggA','User 8'),(6,8,'https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRJpevBOQMgZ-Gaeb54y2Tin-o5vsoOtYW2nYtCpzkYqtj6ENWsHD4d1Bv-AUymOggA','Id 8'),(7,8,'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Southern_right_whale.jpg/220px-Southern_right_whale.jpg','A Whale');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-20 12:04:00
