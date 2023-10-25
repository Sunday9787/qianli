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

 Date: 25/10/2023 12:02:47
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for qianli_about
-- ----------------------------
DROP TABLE IF EXISTS `qianli_about`;
CREATE TABLE `qianli_about` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(20) NOT NULL COMMENT '对应 关于我们 公司环境 专利 合作伙伴',
  `title` varchar(255) DEFAULT NULL,
  `desc` varchar(2000) DEFAULT NULL,
  `img` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of qianli_about
-- ----------------------------
BEGIN;
INSERT INTO `qianli_about` VALUES (1, 'about', '为健康添驱动，让灭菌更安全。', '千立生物是一家科技型药物生产环境微生物控制解决方案提供商，对制药行业法规、工艺有深刻理解。同时也是一家医疗感控领域智能除染解决方案提供商，对医院、急救、疾控、冷链灭菌有着较久的应用经验。;千立生物主要从事研发制造灭菌机器人、环境监测机器人、静脉配药机器人、高分子材料等产品的研究与应用。通过保障环境的洁净程度，保护和提升人员与药品安全，降低人员工作负荷。', '/upload/20220614143609684592.png');
INSERT INTO `qianli_about` VALUES (2, 'env', NULL, NULL, '/upload/20220614143609684592.png');
INSERT INTO `qianli_about` VALUES (3, 'env', NULL, NULL, '/upload/20220614143705262235.jpg');
INSERT INTO `qianli_about` VALUES (4, 'env', NULL, NULL, '/upload/20220614143705130825.jpg');
INSERT INTO `qianli_about` VALUES (5, 'env', NULL, NULL, '/upload/20220614143705477652.jpg');
INSERT INTO `qianli_about` VALUES (6, 'env', NULL, NULL, '/upload/20220614143705692209.jpg');
INSERT INTO `qianli_about` VALUES (7, 'env', NULL, NULL, '/upload/20220614143706539747.jpg');
INSERT INTO `qianli_about` VALUES (8, 'patent', '千立机器人消毒控制软件著作权', '2021SR0817675', '/upload/20220625114247937042.jpg');
INSERT INTO `qianli_about` VALUES (9, 'patent', '外观设计专利证书(签章)', 'CZPCN2031378', '/upload/20220625143752514038.jpg');
INSERT INTO `qianli_about` VALUES (10, 'patent', '外观设计专利证书(签章)', 'CZPCN2031379', '/upload/20220625141751701538.jpg');
INSERT INTO `qianli_about` VALUES (11, 'patent', '实用新型专利证书', 'ZL2021233011159', '/upload/20220625141842494354.jpg');
INSERT INTO `qianli_about` VALUES (12, 'partner', NULL, NULL, '/upload/20220614143936114490.png');
INSERT INTO `qianli_about` VALUES (13, 'partner', NULL, NULL, '/upload/20220614143936123066.png');
INSERT INTO `qianli_about` VALUES (14, 'partner', NULL, NULL, '/upload/20220614143936140623.png');
INSERT INTO `qianli_about` VALUES (15, 'partner', NULL, NULL, '/upload/20220614143936284310.png');
INSERT INTO `qianli_about` VALUES (16, 'partner', NULL, NULL, '/upload/20220614143936419430.png');
INSERT INTO `qianli_about` VALUES (17, 'partner', NULL, NULL, '/upload/20220614143936483591.png');
INSERT INTO `qianli_about` VALUES (18, 'partner', NULL, NULL, '/upload/20220614143936589363.png');
INSERT INTO `qianli_about` VALUES (19, 'partner', NULL, NULL, '/upload/20220614143936594699.png');
INSERT INTO `qianli_about` VALUES (20, 'partner', NULL, NULL, '/upload/20220614143936653222.png');
INSERT INTO `qianli_about` VALUES (21, 'partner', NULL, NULL, '/upload/20220614143936715747.png');
INSERT INTO `qianli_about` VALUES (22, 'partner', NULL, NULL, '/upload/20220614143936774270.png');
INSERT INTO `qianli_about` VALUES (23, 'partner', NULL, NULL, '/upload/20220614143936776293.png');
INSERT INTO `qianli_about` VALUES (24, 'partner', NULL, NULL, '/upload/20220614143936783178.png');
INSERT INTO `qianli_about` VALUES (25, 'partner', NULL, NULL, '/upload/20220614143936114490.png');
INSERT INTO `qianli_about` VALUES (26, 'partner', NULL, NULL, '/upload/20220614143936820573.png');
INSERT INTO `qianli_about` VALUES (27, 'partner', NULL, NULL, '/upload/20220614143937798411.png');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
