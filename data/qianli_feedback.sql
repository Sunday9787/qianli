/*
 Navicat Premium Data Transfer

 Source Server         : qianli
 Source Server Type    : MySQL
 Source Server Version : 80027 (8.0.27)
 Source Host           : localhost:3306
 Source Schema         : qianli

 Target Server Type    : MySQL
 Target Server Version : 80027 (8.0.27)
 File Encoding         : 65001

 Date: 24/11/2023 21:28:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for qianli_feedback
-- ----------------------------
DROP TABLE IF EXISTS `qianli_feedback`;
CREATE TABLE `qianli_feedback` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL COMMENT '用户称呼',
  `status` int NOT NULL DEFAULT '0' COMMENT '0未处理 1已处理',
  `contact` varchar(50) NOT NULL COMMENT '联系方式',
  `area` varchar(20) NOT NULL COMMENT '地区',
  `message` varchar(500) NOT NULL COMMENT '反馈消息',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of qianli_feedback
-- ----------------------------
BEGIN;
INSERT INTO `qianli_feedback` (`id`, `name`, `status`, `contact`, `area`, `message`) VALUES (1, '至尊宝', 1, '17600001111', '花果山', '曾经有一份真挚的感情摆在我的面前我没有珍惜，等到失去的时候才追悔莫及，人间最痛苦的事莫过于此，如果上天能再给我一次机会，我会对那个女孩说三个字：我爱你，如果非要在这份爱上加一个期限，我希望是一万年！');
INSERT INTO `qianli_feedback` (`id`, `name`, `status`, `contact`, `area`, `message`) VALUES (2, '爱德华', 0, '17600001111', '幽灵镇', '人生有振作奋斗的时刻，也有必须接受现实的时候。现在木已成舟，只有傻子才会去钻牛角尖。但事实上，我一直都是个傻子。');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
