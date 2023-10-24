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

 Date: 25/10/2023 00:38:47
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for qianli_department
-- ----------------------------
DROP TABLE IF EXISTS `qianli_department`;
CREATE TABLE `qianli_department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department_name` varchar(255) NOT NULL COMMENT '部门名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of qianli_department
-- ----------------------------
BEGIN;
INSERT INTO `qianli_department` VALUES (1, '行政部');
INSERT INTO `qianli_department` VALUES (2, '销售部');
INSERT INTO `qianli_department` VALUES (3, '研发部');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
