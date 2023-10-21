import { Injectable } from '@nestjs/common'
import manifest from 'backend/manifest.json'

interface LayoutServiceOption {
  isIndex: boolean
}

@Injectable()
export class LayoutService {
  layout(option?: LayoutServiceOption) {
    return {
      manifest,
      isIndex: option?.isIndex,
      menus: [
        { title: '首页', url: '/', children: [] },
        {
          title: '关于千立',
          url: '/about',
          children: [
            { title: '公司介绍 ', url: '/' },
            { title: '公司环境 ', url: '/' },
            { title: '专利展示 ', url: '/' },
            { title: '合作伙伴 ', url: '/' }
          ]
        },
        {
          title: '产品中心',
          url: '/product',
          children: [
            { title: '智能机器人系列', url: '/' },
            { title: '灭菌系列产品', url: '/' },
            { title: '耗材系列', url: '/' }
          ]
        },
        {
          title: '解决方案',
          url: '/',
          children: [
            { title: '医院', url: '/' },
            { title: '生物制药', url: '/' },
            { title: '实验室', url: '/' },
            { title: '急救中心', url: '/' },
            { title: '公共场所', url: '/' }
          ]
        },
        { title: '新闻动态', url: '/', children: [] },
        { title: '联系我们', url: '/', children: [{ title: '人才招聘', url: '/' }] }
      ]
    }
  }
}
