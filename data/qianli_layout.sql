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

 Date: 27/10/2023 22:55:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for qianli_layout
-- ----------------------------
DROP TABLE IF EXISTS `qianli_layout`;
CREATE TABLE `qianli_layout` (
  `id` int NOT NULL AUTO_INCREMENT,
  `parent_id` int DEFAULT NULL COMMENT '父级菜单',
  `title` varchar(255) NOT NULL COMMENT '菜单',
  `link` varchar(255) NOT NULL COMMENT '菜单链接',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of qianli_layout
-- ----------------------------
BEGIN;
INSERT INTO `qianli_layout` VALUES (1, NULL, '首页', '/');
INSERT INTO `qianli_layout` VALUES (2, NULL, '产品中心', '/product');
INSERT INTO `qianli_layout` VALUES (3, NULL, '解决方案', '/');
INSERT INTO `qianli_layout` VALUES (4, NULL, '新闻动态', '/news');
INSERT INTO `qianli_layout` VALUES (5, NULL, '联系我们', '/contact');
INSERT INTO `qianli_layout` VALUES (6, NULL, '关于千立', '/about');
INSERT INTO `qianli_layout` VALUES (7, 6, '公司介绍 ', '/about/#about');
INSERT INTO `qianli_layout` VALUES (8, 6, '公司环境 ', '/about/#env');
INSERT INTO `qianli_layout` VALUES (9, 6, '专利展示 ', '/about/#patent');
INSERT INTO `qianli_layout` VALUES (10, 6, '合作伙伴 ', '/about/#partner');
INSERT INTO `qianli_layout` VALUES (11, 2, '智能机器人系列', '/product?category=1');
INSERT INTO `qianli_layout` VALUES (12, 2, '灭菌系列产品', '/product?category=2');
INSERT INTO `qianli_layout` VALUES (13, 2, '耗材系列', '/product?category=3');
INSERT INTO `qianli_layout` VALUES (14, 3, '医院', '/');
INSERT INTO `qianli_layout` VALUES (15, 3, '生物制药', '/');
INSERT INTO `qianli_layout` VALUES (16, 3, '实验室', '/');
INSERT INTO `qianli_layout` VALUES (17, 3, '急救中心', '/');
INSERT INTO `qianli_layout` VALUES (18, 3, '公共场所', '/');
INSERT INTO `qianli_layout` VALUES (19, 5, '人才招聘', '/contact/#job');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
