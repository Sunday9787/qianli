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

 Date: 25/10/2023 15:23:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for qianli_contact_feedback
-- ----------------------------
DROP TABLE IF EXISTS `qianli_contact_feedback`;
CREATE TABLE `qianli_contact_feedback` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` varchar(1000) NOT NULL,
  `name` varchar(100) NOT NULL,
  `contact` varchar(100) NOT NULL,
  `area` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of qianli_contact_feedback
-- ----------------------------
BEGIN;
INSERT INTO `qianli_contact_feedback` VALUES (1, '曾经有一份真挚的感情摆在我的面前我没有珍惜，等到失去的时候才追悔莫及，人间最痛苦的事莫过于此，如果上天能再给我一次机会，我会对那个女孩说三个字：我爱你，如果非要在这份爱上加一个期限，我希望是一万年！', '至尊宝', '17682311696', '花果山');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
