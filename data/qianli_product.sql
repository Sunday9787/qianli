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

 Date: 27/10/2023 14:06:47
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for qianli_product
-- ----------------------------
DROP TABLE IF EXISTS `qianli_product`;
CREATE TABLE `qianli_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL COMMENT '产品分类',
  `title` varchar(255) NOT NULL COMMENT '产品名称',
  `desc` varchar(255) NOT NULL COMMENT '产品型号',
  `img` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of qianli_product
-- ----------------------------
BEGIN;
INSERT INTO `qianli_product` VALUES (1, 1, '过氧化氢灭菌机器人', 'Cubic 1000', '/upload/20220714104829899810.png');
INSERT INTO `qianli_product` VALUES (2, 1, '悬浮粒子采样机器人', 'P1', '/upload/20220705181331698242.png');
INSERT INTO `qianli_product` VALUES (3, 1, '浮游菌采样机器人', 'mic20', '/upload/20220819160523649805.png');
INSERT INTO `qianli_product` VALUES (4, 2, '固定式过氧化氢灭菌器', 'FHP500', '/upload/20220626161544101013.png');
INSERT INTO `qianli_product` VALUES (5, 2, '便携式过氧化氢消毒机', 'FHP200', '/upload/20220626161850879150.png');
INSERT INTO `qianli_product` VALUES (6, 2, '车载式过氧化氢消毒机', 'FHP100', '/upload/20220626162349554840.png');
INSERT INTO `qianli_product` VALUES (7, 2, '管路式灭菌器', 'ER-D系列', '/upload/20220706095036877990.png');
INSERT INTO `qianli_product` VALUES (8, 2, '脉冲强光灭菌器', 'S1', '/upload/20220626162820141754.png');
INSERT INTO `qianli_product` VALUES (9, 3, '安瓿瓶开启器', 'APM-3', '/upload/20220626163343794616.png');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
