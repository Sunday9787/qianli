import { Injectable } from '@nestjs/common'
import { LayoutService } from '@/layout/layout.service'

@Injectable()
export class AboutService {
  constructor(private layoutService: LayoutService) {}

  data() {
    return {
      layout: this.layoutService.layout(),
      environment: [
        { img: '/upload/20220614143609684592.png' },
        { img: '/upload/20220614143705262235.jpg' },
        { img: '/upload/20220614143705130825.jpg' },
        { img: '/upload/20220614143705477652.jpg' },
        { img: '/upload/20220614143705692209.jpg' },
        { img: '/upload/20220614143706539747.jpg' }
      ],
      patent: [
        { title: '千立机器人消毒控制软件著作权', desc: '2021SR0817675', img: '/upload/20220625114247937042.jpg' },
        { title: '外观设计专利证书(签章)', desc: 'CZPCN2031378', img: '/upload/20220625143752514038.jpg' },
        { title: '外观设计专利证书(签章)', desc: 'CZPCN2031379', img: '/upload/20220625141751701538.jpg' },
        { title: '实用新型专利证书', desc: 'ZL2021233011159', img: '/upload/20220625141842494354.jpg' }
      ],
      partner: [
        { img: '/upload/20220614143936114490.png' },
        { img: '/upload/20220614143936123066.png' },
        { img: '/upload/20220614143936140623.png' },
        { img: '/upload/20220614143936284310.png' },
        { img: '/upload/20220614143936419430.png' },
        { img: '/upload/20220614143936483591.png' },
        { img: '/upload/20220614143936589363.png' },
        { img: '/upload/20220614143936594699.png' },
        { img: '/upload/20220614143936653222.png' },
        { img: '/upload/20220614143936715747.png' },
        { img: '/upload/20220614143936774270.png' },
        { img: '/upload/20220614143936776293.png' },
        { img: '/upload/20220614143936783178.png' },
        { img: '/upload/20220614143936820573.png' },
        { img: '/upload/20220614143937798411.png' }
      ]
    }
  }
}
