/*
 Navicat Premium Data Transfer

 Source Server         : docker-mysql-qianli
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : qianli

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 04/11/2023 13:03:55
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for qianli_category
-- ----------------------------
DROP TABLE IF EXISTS `qianli_category`;
CREATE TABLE `qianli_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) NOT NULL,
  `type` varchar(255) NOT NULL COMMENT '分类类型',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of qianli_category
-- ----------------------------
BEGIN;
INSERT INTO `qianli_category` VALUES (1, '智能机器人系列', 'product');
INSERT INTO `qianli_category` VALUES (2, '灭菌系列产品', 'product');
INSERT INTO `qianli_category` VALUES (3, '耗材系列', 'product');
INSERT INTO `qianli_category` VALUES (4, '资讯动态', 'post');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
