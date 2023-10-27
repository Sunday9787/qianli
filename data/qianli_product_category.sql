/*
 Navicat Premium Data Transfer

 Source Server         : qianli
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : qianli

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 27/10/2023 13:33:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for qianli_product_category
-- ----------------------------
DROP TABLE IF EXISTS `qianli_product_category`;
CREATE TABLE `qianli_product_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of qianli_product_category
-- ----------------------------
BEGIN;
INSERT INTO `qianli_product_category` VALUES (1, '智能机器人系列');
INSERT INTO `qianli_product_category` VALUES (2, '灭菌系列产品');
INSERT INTO `qianli_product_category` VALUES (3, '耗材系列');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
