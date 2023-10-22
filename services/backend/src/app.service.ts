import { Injectable } from '@nestjs/common'
import { LayoutService } from '@/layout/layout.service'

@Injectable()
export class AppService {
  constructor(private layoutService: LayoutService) {}
  data() {
    return {
      layout: this.layoutService.layout({ ghost: ['index'] }),
      message: 'hello word',
      productBanner: [
        {
          model: 'Cubic 1000',
          title: '过氧化氢灭菌机器人',
          desc: '应用于制药车间洁净区、医院病房、公共消毒场所，单次最大灭菌空间1000m³',
          media: 'picture',
          url: '/upload/20220614162623924193.png'
        },
        {
          media: 'video',
          url: '/upload/2022080911373462f1d67e2fd41.mp4'
        },
        {
          model: 'FHP200',
          title: '便携式过氧化氢灭菌器',
          desc: '实验室、检测室灭菌，灭菌体积200立方米',
          media: 'picture',
          url: '/upload/20220809105908829373.png'
        }
      ],
      solveBanner: [
        { title: '医院', more: '灭菌方案', link: '/', url: '/upload/20220614162623924193.png' },
        { title: '生物制药', more: '灭菌方案', link: '/', url: '/upload/20220614162655906894.png' },
        { title: '实验室', more: '灭菌方案', link: '/', url: '/upload/20220614162729120996.png' },
        { title: '急救中心', more: '灭菌方案', link: '/', url: '/upload/20220614162758407080.png' },
        { title: '公共场所', more: '灭菌方案', link: '/', url: '/upload/20220614162825740490.png' }
      ],
      solveItem: [
        { title: '医院', icon: '/upload/20220614162610115260.png', translate: 'Hospital' },
        { title: '生物制药', icon: '/upload/20220614162610121779.png', translate: 'Biopharmaceutical' },
        { title: '实验室', icon: '/upload/20220614162610114322.png', translate: 'Biopharmaceutical' },
        { title: '急救中心', icon: '/upload/20220614162610114322.png', translate: 'Emergency center' },
        { title: '公共场所', icon: '/upload/20220614162610551710.png', translate: 'Public places' }
      ],
      productCenter: {
        series: [
          { label: '智能机器人系列', link: '/product/1' },
          { label: '灭菌系列产品', link: '/product/2' },
          { label: '耗材系列', link: '/product/3' }
        ],
        mainBanner: [
          {
            title: '便携式过氧化氢消毒机 ',
            sub: '灭菌系列产品',
            desc: '',
            link: '/product/7',
            image: '/upload/20220626161856158843.png'
          },
          {
            title: '车载式过氧化氢消毒机',
            sub: '灭菌系列产品',
            desc: '',
            link: '/product/7',
            image: '/upload/20220626162355757476.png'
          },
          {
            title: '过氧化氢灭菌机器人',
            sub: '智能机器人系列',
            desc: 'Cubic 1000灭菌机器人采用最新的压缩喷雾技术，实现过氧化氢粒子小于2μm，对空气和物体表面进行灭菌，做到更强的扩散效力。机器人部分采用工业级AGV机器人底盘，利用激光雷达导航系统，精确定位，利用深度摄像头、超声波传感器等做到精确避障，到达指定位置。',
            link: '/product/7',
            image: '/upload/20220714104839370819.png'
          },
          {
            title: '浮游菌采样机器人',
            sub: '智能机器人系列',
            desc: '',
            link: '/product/7',
            image: '/upload/20220819160532423622.png'
          },
          {
            title: '固定式过氧化氢灭菌器',
            sub: '灭菌系列产品',
            desc: '',
            link: '/product/7',
            image: '/upload/20220626161550774566.png'
          }
        ]
      },
      news: [
        {
          title: '过氧化氢灭菌在生产车间B级区的应用',
          link: '/',
          date: '2023-04-28',
          img: '/upload/20230428144847664046.jpg'
        },
        {
          title: '洁净室竣工后的开荒保洁与灭菌（二）',
          link: '/',
          date: '2022-12-30',
          img: '/upload/20221230154013471254.png'
        },
        {
          title: '洁净室竣工后的开荒保洁与灭菌（一）',
          link: '/',
          date: '2023-04-28',
          img: '/upload/20221212170017104398.png'
        },
        {
          title: '洁净车间不同化学消毒方式的对比',
          link: '/',
          date: '2023-04-28',
          img: '/upload/20221110141603377875.jpeg'
        }
      ]
    }
  }
}
