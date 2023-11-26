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

 Date: 25/10/2023 00:38:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for qianli_job
-- ----------------------------
DROP TABLE IF EXISTS `qianli_job`;
CREATE TABLE `qianli_job` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL COMMENT '岗位',
  `status` int NOT NULL DEFAULT '0' COMMENT '职位状态 0未发布 1已发布',
  `num` int NOT NULL COMMENT '招聘人数',
  `department_id` int NOT NULL COMMENT '招聘部门',
  `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '文章创建时间',
  `updated` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '文章更新时间',
  `city` varchar(255) NOT NULL COMMENT '招聘城市',
  `requirement` varchar(1000) NOT NULL COMMENT '招聘要求',
  `responsibility` varchar(1000) NOT NULL COMMENT '岗位职责',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of qianli_job
-- ----------------------------
BEGIN;
INSERT INTO `qianli_job` VALUES (1, '内勤文员', 1, 10, 1, '2023-10-22 16:04:20', '2023-10-22 16:04:20.000000', '杭州市', '1.大专（含）以上学历，市场营销、医药、生物或相关专业优先；\r\n2.能熟练运用电脑进行文件、数据处理；\r\n3.具有良好的语言表达沟通能力；\r\n4.具备接受新事物、新知识的能力，以及较强的突发事件处理能力；具有较强的逻辑性、条理性和数据分析能力，能适应临时性短期出差。', '1、熟练掌握本公司产品及其所涉及的专业知识。\r\n2、与顾客和同事能有效沟通。\r\n3、熟知所有与销售相关的制度与规定。\r\n4、能熟练撰写商务应用所需的各类应用文件。\r\n5、能学习掌握标书的撰写；\r\n6、详细记录每次会议、培训纪要及总结。\r\n7、听从领导行程安排，与销售业务对接，适时出差。');
INSERT INTO `qianli_job` VALUES (2, '商务专员', 1, 10, 2, '2023-10-22 16:04:20', '2023-10-22 16:04:20.000000', '杭州市', '1.大专（含）以上学历，市场营销、医药、生物或相关专业优先；\r\n2.能熟练运用电脑进行文件、数据处理；\r\n3.具有良好的语言表达沟通能力；\r\n4.具备接受新事物、新知识的能力，以及较强的突发事件处理能力；具有较强的逻辑性、条理性和数据分析能力，能适应临时性短期出差。', '1、熟练掌握本公司产品及其所涉及的专业知识。\r\n2、与顾客和同事能有效沟通。\r\n3、熟知所有与销售相关的制度与规定。\r\n4、能熟练撰写商务应用所需的各类应用文件。\r\n5、能学习掌握标书的撰写；\r\n6、详细记录每次会议、培训纪要及总结。\r\n7、听从领导行程安排，与销售业务对接，适时出差。');
INSERT INTO `qianli_job` VALUES (3, '微生物检测员', 1, 10, 3, '2023-10-22 16:04:20', '2023-10-22 16:04:20.000000', '杭州市', '1、大专及以上学历，生物工程、生物技术、生物制药、等相关专业，有药厂QA、药品无菌检查、微生物限度检查、消毒认证经验者优先；\r\n2、熟悉药典、GMP法规指南、计算机验证、微生物检测等知识；\r\n3、具有独立撰写实验方案及实验报告的能力；\r\n4、具有一定的实验数据整理分析能力，能熟练运用电脑进行文件处理；\r\n5、具备接受新事物、新知识的能力及较强的现场沟通应变能力；\r\n6、具有较强的自主学习能力及动手能力；\n7、适应短期出差。', '1、负责公司经营范围内的产品，如过氧化氢灭菌机器人、脉冲强光灭菌器等技术方案、DQ、IQ、OQ、PQ方案和报告、风险评估及其他相关文件的编写;\r\n2、负责过氧化氢灭菌机器人、脉冲强光灭菌器产品的开发测试；\r\n3、负责产品的外出验证（该岗位有额外的外出验证项目奖励，单次200-1000不等，与当月薪资一同发放）');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
