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

 Date: 03/11/2023 16:24:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for qianli_scenario
-- ----------------------------
DROP TABLE IF EXISTS `qianli_scenario`;
CREATE TABLE `qianli_scenario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `text` varchar(255) NOT NULL COMMENT '场景标题',
  `img` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of qianli_scenario
-- ----------------------------
BEGIN;
INSERT INTO `qianli_scenario` VALUES (1, 1, '净化车间', '//localhost:3000/upload/20220626170225434936.png', '//localhost:3000/upload/20220626170218656127.png');
INSERT INTO `qianli_scenario` VALUES (2, 1, '微生物实验室', '//localhost:3000/upload/20220626170901724151.jpg', '//localhost:3000/upload/20220626170413541992.png');
INSERT INTO `qianli_scenario` VALUES (3, 1, '制药车间', '//localhost:3000/upload/20220626170848731475.jpg', '//localhost:3000/upload/20220626170434926574.png');
INSERT INTO `qianli_scenario` VALUES (4, 1, '实验动物房', '//localhost:3000/upload/20220626170834133117.jpg', '//localhost:3000/upload/20220626170504440002.png');
INSERT INTO `qianli_scenario` VALUES (5, 1, '生物安全实验室', '//localhost:3000/upload/20220626170820834777.jpg', '//localhost:3000/upload/20220626170538740966.png');
INSERT INTO `qianli_scenario` VALUES (6, 4, '无菌室', '//localhost:3000/upload/20220626171104825317.png', '//localhost:3000/upload/20220627114036729644.png');
INSERT INTO `qianli_scenario` VALUES (7, 4, '阳性菌接种室', '//localhost:3000/upload/20220626171501773925.jpg', '//localhost:3000/upload/20220627114036671966.png');
INSERT INTO `qianli_scenario` VALUES (8, 4, '制药车间', '//localhost:3000/upload/20220626171515452026.jpg', '//localhost:3000/upload/20220626171523789031.png');
INSERT INTO `qianli_scenario` VALUES (9, 4, '实验动物房', '//localhost:3000/upload/20220626171545402832.jpg', '//localhost:3000/upload/20220626171535297698.png');
INSERT INTO `qianli_scenario` VALUES (10, 5, '无菌室', '//localhost:3000/upload/20220626171104825317.png', '//localhost:3000/upload/20220627114036729644.png');
INSERT INTO `qianli_scenario` VALUES (11, 5, '阳性菌接种室', '//localhost:3000/upload/20220626171501773925.jpg', '//localhost:3000/upload/20220627114036671966.png');
INSERT INTO `qianli_scenario` VALUES (12, 5, '制药车间', '//localhost:3000/upload/20220626171515452026.jpg', '//localhost:3000/upload/20220626171523789031.png');
INSERT INTO `qianli_scenario` VALUES (13, 5, '实验动物房', '//localhost:3000/upload/20220626171545402832.jpg', '//localhost:3000/upload/20220626171535297698.png');
INSERT INTO `qianli_scenario` VALUES (14, 6, '救护车辆', '//localhost:3000/upload/20220626172011324920.jpg', '//localhost:3000/upload/20220627120131466461.png');
INSERT INTO `qianli_scenario` VALUES (15, 6, '特种车辆', '//localhost:3000/upload/20220626172321380340.jpg', '//localhost:3000/upload/20220627120131967102.png');
INSERT INTO `qianli_scenario` VALUES (16, 6, '冷链运输车辆', '//localhost:3000/upload/20220626172449940399.jpg', '//localhost:3000/upload/20220627120131367370.png');
INSERT INTO `qianli_scenario` VALUES (17, 7, '无菌室', '//localhost:3000/upload/20220626171104825317.png', '//localhost:3000/upload/20220627114036729644.png');
INSERT INTO `qianli_scenario` VALUES (18, 7, '阳性菌接种室', '//localhost:3000/upload/20220626171501773925.jpg', '//localhost:3000/upload/20220627114036671966.png');
INSERT INTO `qianli_scenario` VALUES (19, 7, '制药车间', '//localhost:3000/upload/20220626171515452026.jpg', '//localhost:3000/upload/20220626171523789031.png');
INSERT INTO `qianli_scenario` VALUES (20, 7, '实验动物房', '//localhost:3000/upload/20220626171545402832.jpg', '//localhost:3000/upload/20220626171535297698.png');
INSERT INTO `qianli_scenario` VALUES (21, 8, '净化车间', '//localhost:3000/upload/20220626170225434936.png', '//localhost:3000/upload/20220626170218656127.png');
INSERT INTO `qianli_scenario` VALUES (22, 8, '实验室', '//localhost:3000/upload/20220626170901724151.jpg', '//localhost:3000/upload/20220626170413541992.png');
INSERT INTO `qianli_scenario` VALUES (23, 9, '医院配药', '//localhost:3000/upload/20220626173219356628.jpg', '//localhost:3000/upload/20220627120836844055.png');
INSERT INTO `qianli_scenario` VALUES (24, 9, '护士站', '//localhost:3000/upload/20220626173153981201.jpg', '//localhost:3000/upload/20220627120836813476.png');
INSERT INTO `qianli_scenario` VALUES (25, 9, '药企质检', '//localhost:3000/upload/20220626173351302307.jpg', '//localhost:3000/upload/20220627120836513580.png');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
