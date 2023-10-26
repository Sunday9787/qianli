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

 Date: 25/10/2023 15:58:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for qianli_contact
-- ----------------------------
DROP TABLE IF EXISTS `qianli_contact`;
CREATE TABLE `qianli_contact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `desc` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of qianli_contact
-- ----------------------------
BEGIN;
INSERT INTO `qianli_contact` VALUES (1, '服务热线', '0571-87705098', '总机');
INSERT INTO `qianli_contact` VALUES (2, '企业邮箱', 'sales@qianlibio.com', '市场部');
INSERT INTO `qianli_contact` VALUES (3, '公司地址', '浙江省杭州市西湖区转塘街道浮山街德力西园区', '总部');
INSERT INTO `qianli_contact` VALUES (4, '手机号', '13396596608', '');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
