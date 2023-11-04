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

 Date: 03/11/2023 16:24:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for qianli_spec
-- ----------------------------
DROP TABLE IF EXISTS `qianli_spec`;
CREATE TABLE `qianli_spec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `label` varchar(255) NOT NULL COMMENT '参数label',
  `value` varchar(255) NOT NULL COMMENT '参数值',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of qianli_spec
-- ----------------------------
BEGIN;
INSERT INTO `qianli_spec` VALUES (1, 1, '供电电压', 'AC220V,50Hz');
INSERT INTO `qianli_spec` VALUES (2, 1, '灭菌剂', '7.5%过氧化氢灭菌剂或其他类型灭菌剂');
INSERT INTO `qianli_spec` VALUES (3, 1, '灭菌模式', '干雾过氧化氢灭菌');
INSERT INTO `qianli_spec` VALUES (4, 1, '灭菌剂量装', '10L');
INSERT INTO `qianli_spec` VALUES (5, 1, '灭菌对象', '空气及物体表面');
INSERT INTO `qianli_spec` VALUES (6, 1, '功率', '500W');
INSERT INTO `qianli_spec` VALUES (7, 1, '喷头结构', '3喷头设计，可360°消毒');
INSERT INTO `qianli_spec` VALUES (8, 1, '工作时间', '≥5h');
INSERT INTO `qianli_spec` VALUES (9, 1, '电池容量', '40Anh');
INSERT INTO `qianli_spec` VALUES (10, 1, '喷雾量', '1-16g/min（单个喷头），可调');
INSERT INTO `qianli_spec` VALUES (11, 1, '最大灭菌空间', '≥1000m³');
INSERT INTO `qianli_spec` VALUES (12, 1, '喷雾粒径', '≤2μm');
INSERT INTO `qianli_spec` VALUES (13, 1, '噪音', '≤65db（A）');
INSERT INTO `qianli_spec` VALUES (14, 1, '控制方式', '10.7寸平板电脑控制');
INSERT INTO `qianli_spec` VALUES (15, 1, '外形尺寸', '519*512*1308（L*W*H）mm');
INSERT INTO `qianli_spec` VALUES (16, 1, '设备重量', '60Kg');
INSERT INTO `qianli_spec` VALUES (17, 1, '单次灭菌空间（MAX）', '1000立方米内（400平方米内）');
INSERT INTO `qianli_spec` VALUES (18, 1, '新建地图数（MAX）', '99张');
INSERT INTO `qianli_spec` VALUES (19, 1, '灭菌配方选择', '在不同地图上可选择不同灭菌\\消毒要求，选择不同灭菌配方');
INSERT INTO `qianli_spec` VALUES (20, 1, '灭菌高度', '房间高度6米内');
INSERT INTO `qianli_spec` VALUES (21, 1, '供电方式', '返回充电桩自动充电');
INSERT INTO `qianli_spec` VALUES (22, 1, '灭菌有效性', '生物指示剂BI测试6个对数级');
INSERT INTO `qianli_spec` VALUES (23, 2, '重量', '50kg');
INSERT INTO `qianli_spec` VALUES (24, 2, '尺寸', '519mm*512mm*850mm');
INSERT INTO `qianli_spec` VALUES (25, 2, '定位方式', '激光雷达导航');
INSERT INTO `qianli_spec` VALUES (26, 2, '工作时长', '5小时');
INSERT INTO `qianli_spec` VALUES (27, 2, '充电方式', '配置充电桩自动充电');
INSERT INTO `qianli_spec` VALUES (28, 2, '电池容量', '30Anh');
INSERT INTO `qianli_spec` VALUES (29, 2, '控制模式', '预约采样、自动控制');
INSERT INTO `qianli_spec` VALUES (30, 2, '噪音', '30分贝');
INSERT INTO `qianli_spec` VALUES (31, 3, '机器人参数', '1、单次采样数：20个点，预设20个预设体积。\n2、自动记录和保存点位位置及采样时间等信息。\n3、可加载不同车间图纸。\n4、单次充满电可连续工作10小时。\n');
INSERT INTO `qianli_spec` VALUES (32, 3, '浮游菌采样仪参数', '1、100L/min\n2、内置流量计\n3、采样流量：1-6000L。\n4、可存储2000组数据。\n5、通讯方式USB\n\n');
INSERT INTO `qianli_spec` VALUES (33, 4, '供电方式', 'AC220V,50±1Hz');
INSERT INTO `qianli_spec` VALUES (34, 4, '灭菌剂', '7.5%过氧化氢灭菌剂或Minncare杀孢子剂');
INSERT INTO `qianli_spec` VALUES (35, 4, '储液桶容积', '10L');
INSERT INTO `qianli_spec` VALUES (36, 4, '最大灭菌空间', '500m³');
INSERT INTO `qianli_spec` VALUES (37, 4, '控制方式', 'PLC控制，7寸彩色触摸屏操作');
INSERT INTO `qianli_spec` VALUES (38, 4, '无线遥控距离', '300米内');
INSERT INTO `qianli_spec` VALUES (39, 4, '喷雾量', '1～16mL/min，可调');
INSERT INTO `qianli_spec` VALUES (40, 4, '设备重量', '40Kg');
INSERT INTO `qianli_spec` VALUES (41, 4, '外形尺寸', '496*500*1050(L*W*H)mm');
INSERT INTO `qianli_spec` VALUES (42, 5, '供电方式', 'AC220V,50±1Hz');
INSERT INTO `qianli_spec` VALUES (43, 5, '灭菌剂', '7.5%过氧化氢灭菌剂或Minncare杀孢子剂');
INSERT INTO `qianli_spec` VALUES (44, 5, '储存桶容积', '1L');
INSERT INTO `qianli_spec` VALUES (45, 5, '最大灭菌空间', '200m³');
INSERT INTO `qianli_spec` VALUES (46, 5, '控制方式', 'PLC控制，4.3寸彩色触摸屏操作');
INSERT INTO `qianli_spec` VALUES (47, 5, '无线遥控距离', '300米内');
INSERT INTO `qianli_spec` VALUES (48, 5, '喷雾量', '1～16mL/min,可调');
INSERT INTO `qianli_spec` VALUES (49, 5, '设备重量', '5Kg');
INSERT INTO `qianli_spec` VALUES (50, 5, '外形尺寸', '454*263*342（L*W*H)mm');
INSERT INTO `qianli_spec` VALUES (51, 6, '供电方式', '锂电池供电');
INSERT INTO `qianli_spec` VALUES (52, 6, '消毒剂', '7.5%过氧化消毒剂');
INSERT INTO `qianli_spec` VALUES (53, 6, '消毒容积', '500ml');
INSERT INTO `qianli_spec` VALUES (54, 6, '最大灭菌空间', '100立方米');
INSERT INTO `qianli_spec` VALUES (55, 6, '控制方式', '手动或遥控器开启或关闭。');
INSERT INTO `qianli_spec` VALUES (56, 6, '喷雾量', '1-16ml/min');
INSERT INTO `qianli_spec` VALUES (57, 6, '电池用量', '充满电一次可满足10辆救护车辆消毒使用。');
INSERT INTO `qianli_spec` VALUES (58, 6, '设备重量', '5kg');
INSERT INTO `qianli_spec` VALUES (59, 7, '供电方式', 'AC220V,50±1Hz');
INSERT INTO `qianli_spec` VALUES (60, 7, '灭菌剂', '7.5%过氧化氢灭菌剂或Minncare杀孢子剂');
INSERT INTO `qianli_spec` VALUES (61, 7, '储存桶容积', '1L');
INSERT INTO `qianli_spec` VALUES (62, 7, '最大灭菌空间', '200m³');
INSERT INTO `qianli_spec` VALUES (63, 7, '控制方式', 'PLC控制，4.3寸彩色触摸屏操作');
INSERT INTO `qianli_spec` VALUES (64, 7, '无线遥控距离', '300米内');
INSERT INTO `qianli_spec` VALUES (65, 7, '喷雾量', '1～16mL/min,可调');
INSERT INTO `qianli_spec` VALUES (66, 7, '设备重量', '5Kg');
INSERT INTO `qianli_spec` VALUES (67, 7, '外形尺寸', '454*263*342（L*W*H)mm');
INSERT INTO `qianli_spec` VALUES (68, 8, '供电方式', 'AC220V,50Hz');
INSERT INTO `qianli_spec` VALUES (69, 8, '放置方式', '挂壁、水平放置均可');
INSERT INTO `qianli_spec` VALUES (70, 8, '灭菌因子', '脉冲强光');
INSERT INTO `qianli_spec` VALUES (71, 8, '脉冲灯数量', '3根，每根长度65mm');
INSERT INTO `qianli_spec` VALUES (72, 8, '脉冲灯功率', '15W');
INSERT INTO `qianli_spec` VALUES (73, 8, '单根灯管单次闪照能量', '5J');
INSERT INTO `qianli_spec` VALUES (74, 8, '单次使用时间', '3～5Min');
INSERT INTO `qianli_spec` VALUES (75, 8, '灭菌体积', '3m³');
INSERT INTO `qianli_spec` VALUES (76, 8, '设备重量', '1Kg');
INSERT INTO `qianli_spec` VALUES (77, 9, '适配规格', '1ml/2ml/5ml/10ml，4种规格可随意切换。');
INSERT INTO `qianli_spec` VALUES (78, 9, '材质', 'pp材料');
INSERT INTO `qianli_spec` VALUES (79, 9, '消毒', '耐受消毒剂擦拭、湿热灭菌等');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
