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

 Date: 07/11/2023 21:54:41
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for qianli_user
-- ----------------------------
DROP TABLE IF EXISTS `qianli_user`;
CREATE TABLE `qianli_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL COMMENT '用户邮箱',
  `username` varchar(255) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `avatar` varchar(255) DEFAULT NULL,
  `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of qianli_user
-- ----------------------------
BEGIN;
INSERT INTO `qianli_user` VALUES (1, '809537981@qq.com' , '至尊宝', '2545dd85aa094efa6ca333dd63b571d0', 'https://qianli-1256180570.cos.ap-nanjing.myqcloud.com/avatar.jpg', '2023-11-07 13:54:04.926523', '2023-11-07 13:54:04.926523');
INSERT INTO `qianli_user` VALUES (2, 'daishixiang70@163.com' , 'admin', 'fcea920f7412b5da7be0cf42b8c93759', 'https://qianli-1256180570.cos.ap-nanjing.myqcloud.com/admin_avatar.jpg', '2023-11-07 13:54:16.425956', '2023-11-07 13:54:16.425956');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
