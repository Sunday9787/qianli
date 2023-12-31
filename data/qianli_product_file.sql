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

 Date: 03/11/2023 16:24:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for qianli_product_file
-- ----------------------------
DROP TABLE IF EXISTS `qianli_product_file`;
CREATE TABLE `qianli_product_file` (
  `id` int NOT NULL AUTO_INCREMENT,
  `path` varchar(500) NOT NULL,
  `product_id` int NOT NULL COMMENT '产品',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of qianli_product_file
-- ----------------------------
BEGIN;
INSERT INTO `qianli_product_file` VALUES (1, '//localhost:3000/upload/20220714104915478210.png', 1);
INSERT INTO `qianli_product_file` VALUES (2, '//localhost:3000/upload/20220714104915569458.png', 1);
INSERT INTO `qianli_product_file` VALUES (3, '//localhost:3000/upload/20220714104915886413.png', 1);
INSERT INTO `qianli_product_file` VALUES (4, '//localhost:3000/upload/20220714104916320037.png', 1);
INSERT INTO `qianli_product_file` VALUES (5, '//localhost:3000/upload/20220705181350230804.png', 2);
INSERT INTO `qianli_product_file` VALUES (6, '//localhost:3000/upload/20220705181350247070.png', 2);
INSERT INTO `qianli_product_file` VALUES (7, '//localhost:3000/upload/20220705181350334533.png', 2);
INSERT INTO `qianli_product_file` VALUES (8, '//localhost:3000/upload/20220705181350743377.png', 2);
INSERT INTO `qianli_product_file` VALUES (9, '//localhost:3000/upload/20220819160658858128.png', 3);
INSERT INTO `qianli_product_file` VALUES (10, '//localhost:3000/upload/20220819160658265997.png', 3);
INSERT INTO `qianli_product_file` VALUES (11, '//localhost:3000/upload/20220819160658381142.png', 3);
INSERT INTO `qianli_product_file` VALUES (12, '//localhost:3000/upload/20220714163018821594.png', 4);
INSERT INTO `qianli_product_file` VALUES (13, '//localhost:3000/upload/20220714163018738372.png', 4);
INSERT INTO `qianli_product_file` VALUES (14, '//localhost:3000/upload/20220714163018684936.png', 4);
INSERT INTO `qianli_product_file` VALUES (15, '//localhost:3000/upload/20220626161902817565.png', 5);
INSERT INTO `qianli_product_file` VALUES (16, '//localhost:3000/upload/20220626161910507202.png', 5);
INSERT INTO `qianli_product_file` VALUES (17, '//localhost:3000/upload/20220626161910885864.png', 5);
INSERT INTO `qianli_product_file` VALUES (18, '//localhost:3000/upload/20220626161910379333.png', 5);
INSERT INTO `qianli_product_file` VALUES (19, '//localhost:3000/upload/20220626162405671112.png', 6);
INSERT INTO `qianli_product_file` VALUES (20, '//localhost:3000/upload/20220626162406965881.png', 6);
INSERT INTO `qianli_product_file` VALUES (21, '//localhost:3000/upload/20220626162406446655.png', 6);
INSERT INTO `qianli_product_file` VALUES (22, '//localhost:3000/upload/20220626162406822021.png', 6);
INSERT INTO `qianli_product_file` VALUES (23, '//localhost:3000/upload/20220626162406298400.png', 6);
INSERT INTO `qianli_product_file` VALUES (24, '//localhost:3000/upload/20220714152621907684.png', 7);
INSERT INTO `qianli_product_file` VALUES (25, '//localhost:3000/upload/20220714152622150115.png', 7);
INSERT INTO `qianli_product_file` VALUES (26, '//localhost:3000/upload/20220714152621418426.png', 7);
INSERT INTO `qianli_product_file` VALUES (27, '//localhost:3000/upload/20220626162835792785.png', 8);
INSERT INTO `qianli_product_file` VALUES (28, '//localhost:3000/upload/20220714152139205474.png', 9);
INSERT INTO `qianli_product_file` VALUES (29, '//localhost:3000/upload/20220714152139789581.png', 9);
INSERT INTO `qianli_product_file` VALUES (30, '//localhost:3000/upload/20220714152139298797.png', 9);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
