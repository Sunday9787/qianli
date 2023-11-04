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

 Date: 04/11/2023 11:28:33
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for qianli_feature
-- ----------------------------
DROP TABLE IF EXISTS `qianli_feature`;
CREATE TABLE `qianli_feature` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `title` varchar(255) NOT NULL COMMENT '产品特点标题',
  `desc` varchar(255) DEFAULT '' COMMENT '产品特点描述',
  `img` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ff6e5c298fa9e09c6780cb7766e` (`product_id`),
  CONSTRAINT `FK_ff6e5c298fa9e09c6780cb7766e` FOREIGN KEY (`product_id`) REFERENCES `qianli_product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of qianli_feature
-- ----------------------------
BEGIN;
INSERT INTO `qianli_feature` VALUES (1, 1, '压缩气体喷雾与蠕动定量加注做到灭菌气体浓度一致', NULL, '/image/20220626160250982513.png');
INSERT INTO `qianli_feature` VALUES (2, 1, '满电状态下单次灭菌体积大于1000m³', NULL, '/image/20220626160039799346.png');
INSERT INTO `qianli_feature` VALUES (3, 1, '搭载高精度激光雷达和即时定位技术，自主构建平面地图', NULL, '/image/20220626160314286865.png');
INSERT INTO `qianli_feature` VALUES (4, 1, '可根据房间灭菌顺序恶化要求，实现全自动灭菌', NULL, '/image/20220626160336420227.png');
INSERT INTO `qianli_feature` VALUES (5, 1, '自动避障，在复杂环境也能自由行走', NULL, '/image/20220627112820782287.png');
INSERT INTO `qianli_feature` VALUES (6, 1, '对房间多、布局杂乱的复杂环境能够实现均匀灭菌', NULL, '/image/20220627112958503021.png');
INSERT INTO `qianli_feature` VALUES (7, 1, '灭菌、报警数据实时记录，并支持历史记录查询和权限保护', NULL, '/image/20220627112942796356.png');
INSERT INTO `qianli_feature` VALUES (8, 1, '通过移动式底盘和多角度喷头实现均匀灭菌', NULL, '/image/20220627112923839019.png');
INSERT INTO `qianli_feature` VALUES (9, 2, '不另外配置悬浮粒子计数器等设备，适配和兼容不同类型、品牌、尺寸悬浮粒子采样器。', NULL, '/upload/20220627113040578186.png');
INSERT INTO `qianli_feature` VALUES (10, 2, '可连续采样10小时以上。', NULL, '/upload/20220627113055618957.png');
INSERT INTO `qianli_feature` VALUES (11, 2, '机器人可采样范围：3000平方。', NULL, '/upload/20220627113111468688.png');
INSERT INTO `qianli_feature` VALUES (12, 2, '可自行避开障碍物。到达指定检测点位进行采样。', NULL, '/upload/20220627113126848754.png');
INSERT INTO `qianli_feature` VALUES (13, 3, '内置20个预装培养基平皿，一次采样点位20个。', NULL, '/upload/20220627113152298400.png');
INSERT INTO `qianli_feature` VALUES (14, 3, '每个点位采样时间、流量可调节。', NULL, '/upload/20220627113209355682.png');
INSERT INTO `qianli_feature` VALUES (15, 3, '自动换皿模块，大大降低换皿风险。', NULL, '/upload/20220627113225796569.png');
INSERT INTO `qianli_feature` VALUES (16, 3, '无人值守，预约采样。', NULL, '/upload/20220627113241402801.png');
INSERT INTO `qianli_feature` VALUES (17, 4, '验证菌：6个对数级嗜热脂肪芽孢杆菌', NULL, '/upload/20220627114036868225.png');
INSERT INTO `qianli_feature` VALUES (18, 4, '设备可根据空间体积，自动计算消毒时间', NULL, '/upload/20220627114036983032.png');
INSERT INTO `qianli_feature` VALUES (19, 4, '可延时启动，也可远程遥控启动，人员可安全撤离', NULL, '/upload/20220627114036127380.png');
INSERT INTO `qianli_feature` VALUES (20, 4, '消毒后无残留、无二次污染、无有害物质', NULL, '/upload/20220627114036646728.png');
INSERT INTO `qianli_feature` VALUES (21, 4, '计算机电子签名、设计追踪等功能，支持数据存储、导出', NULL, '/upload/20220627114036794952.png');
INSERT INTO `qianli_feature` VALUES (22, 4, '三向喷嘴，可360度消毒，喷嘴可以单一开启或同时开启', NULL, '/upload/20220627114036294464.png');
INSERT INTO `qianli_feature` VALUES (23, 5, '高效广谱杀菌，可杀灭各类细菌、病毒、真菌和芽孢', NULL, '/upload/20220627114526665039.png');
INSERT INTO `qianli_feature` VALUES (24, 5, '设备可根据空间体积，自动计算消毒时间', NULL, '/upload/20220627114526358459.png');
INSERT INTO `qianli_feature` VALUES (25, 5, '可延时启动，也可远程遥控启动，人员可安全撤离', NULL, '/upload/20220627114526102752.png');
INSERT INTO `qianli_feature` VALUES (26, 5, '消毒后无残留、无二次污染、无有害物质', NULL, '/upload/20220627114526841064.png');
INSERT INTO `qianli_feature` VALUES (27, 5, '雾化颗粒小于5μm', NULL, '/upload/20220627114526821868.png');
INSERT INTO `qianli_feature` VALUES (28, 5, '便携式设计，轻便易转移', NULL, '/upload/20220627114526404174.png');
INSERT INTO `qianli_feature` VALUES (29, 7, '降低成本', '低浓度过氧化氢灭菌剂对彩钢板、橡胶、设备等兼容性强，不需要使用特殊涂层彩钢板或不锈钢建造洁净区。', '/upload/20220627120243148132.png');
INSERT INTO `qianli_feature` VALUES (30, 7, '控制性能', '可独立对单个、多个房间或全区域灭菌，对不同大小区域洁净区可独立调整灭菌剂量及时间。', '/upload/20220627120243708770.png');
INSERT INTO `qianli_feature` VALUES (31, 7, '设备联动', '可与车间控制、空调送风系统进行联动控制。', '/upload/20220627120243567840.png');
INSERT INTO `qianli_feature` VALUES (32, 7, '降低风险', '设备主机布置在低级别区域，降低更换灭菌剂、设备维护等操作造成对A/B级核心区域污染风险。', '/upload/20220627120243416168.png');
INSERT INTO `qianli_feature` VALUES (33, 7, '独立管路', '不接入空调管路，灭菌管路单独布点，对净化区域内的操作间、走廊、更衣和缓冲等房间均配置独立喷头。', '/upload/20220627120243996063.png');
INSERT INTO `qianli_feature` VALUES (34, 7, '操作简单', '无需人员摆放灭菌设备及相关辅助工具等。', '/upload/20220627120243555480.png');
INSERT INTO `qianli_feature` VALUES (35, 7, '结果记录', '采用PLC程序控制，使用数据可记录并打印相关灭菌数据，符合电子签名、审计追踪等计算机软件验证要求。', '/upload/20220627120243827056.png');
INSERT INTO `qianli_feature` VALUES (36, 7, '功能齐全', '主机配置称重、报警、预约灭菌等功能，同时可配置浓度传感器进行实时数据监测。', '/upload/20220627120243697021.png');
INSERT INTO `qianli_feature` VALUES (37, 8, '高效', '3分钟内对3立方米以内区域完成灭菌', '/upload/20220627120659127441.png');
INSERT INTO `qianli_feature` VALUES (38, 8, '广谱', '脉冲强光对霉菌、革兰氏阳性致病菌、革兰氏阳性致病菌、需氧细菌芽孢和真菌分生孢子、金黄色葡萄球菌、古草杆菌、酵母菌等都有明显的杀菌效果。', '/upload/20220627120659621643.png');
INSERT INTO `qianli_feature` VALUES (39, 8, '低风险', '大量测试数据显示，脉冲强光灭菌器内不含高压气体，在需要停止工作时能立刻停止，不会有紫外线泄露。', '/upload/20220627120659447448.png');
INSERT INTO `qianli_feature` VALUES (40, 9, '一次开启：3瓶药液。', NULL, '/upload/20220627120836643341.png');
INSERT INTO `qianli_feature` VALUES (41, 9, '全程操作与安瓿瓶与手部不接触。', NULL, '/upload/20220627120836412628.png');
INSERT INTO `qianli_feature` VALUES (42, 9, '药液抽取过程不滑落、溢出等。', NULL, '/upload/20220627120836314086.png');
INSERT INTO `qianli_feature` VALUES (43, 9, '玻璃碎渣少。', NULL, '/upload/20220627120836416870.png');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
