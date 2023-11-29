import type { ProductScenarioEntity } from '@/service/product.scenario.entity'
import type { ProductFeatureEntity } from '@/service/product.feature.entity'
import type { ProductSpecEntity } from '@/service/product.spec.entity'
import type { ProductImgEntity } from '@/service/product.img.entity'
import type { ProductEntity } from '@/service/product.entity'
import type { PropType } from 'vue'
import { NGrid, NCard, NImage, NGridItem, NTable, NSpace, NH2, NH4 } from 'naive-ui'
import { useCacheModule } from '@/store/modules/cache'

type BlockType = 'img' | 'feature' | 'scenario' | 'spec'

export const ProductBaseBlock = defineComponent({
  name: 'ProductBaseBlock',
  props: {
    data: { type: Object as PropType<ProductEntity>, required: true }
  },
  setup(props) {
    const cacheModule = useCacheModule()
    const category = computed(function () {
      return cacheModule.categoryMap.get(props.data.category_id)
    })

    return { cacheModule, category }
  },
  render() {
    return (
      <NSpace vertical>
        <NH2>基本信息</NH2>
        <NTable>
          <colgroup>
            <col width='12%' />
            <col width='12%' />
            <col width='12%' />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>产品标题</th>
              <th>产品名称</th>
              <th>产品分类</th>
              <th>产品描述</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.data.title}</td>
              <td>{this.data.name}</td>
              <td>{this.category?.category_name}</td>
              <td>{this.data.desc}</td>
            </tr>
          </tbody>
        </NTable>
      </NSpace>
    )
  }
})

function renderBlockImg(img: ProductImgEntity[]) {
  if (img.length) {
    return (
      <NSpace vertical>
        <NH2>产品图片</NH2>
        <NGrid responsive='screen' cols='s:2 m:2 xl:4 xxl:5' xGap={10} yGap={10}>
          {img.map(function (item) {
            return (
              <NGridItem>
                <NImage src={item.path} objectFit='cover' />
              </NGridItem>
            )
          })}
        </NGrid>
      </NSpace>
    )
  }
}

function renderFeature(data: ProductFeatureEntity[]) {
  if (data.length) {
    return (
      <NSpace vertical>
        <NH2>产品特点</NH2>
        <NGrid responsive='screen' cols='s:1 m:2 xl:3 xxl:4' xGap={10} yGap={10}>
          {data.map(function (item) {
            return (
              <NGridItem>
                <NCard class='h-full'>
                  <NH4>标题</NH4>
                  <p>{item.title}</p>

                  <NH4>描述</NH4>
                  <p>{item.desc}</p>

                  <NH4>图片</NH4>
                  <NImage src={item.img} objectFit='cover' />
                </NCard>
              </NGridItem>
            )
          })}
        </NGrid>
      </NSpace>
    )
  }
}

function renderScenario(data: ProductScenarioEntity[]) {
  if (data.length) {
    return (
      <NSpace vertical>
        <NH2>应用场景</NH2>
        <NGrid responsive='screen' cols='s:1 m:2 xl:3 xxl:4' xGap={10} yGap={10}>
          {data.map(function (item) {
            return (
              <NGridItem>
                <NCard class='h-full'>
                  <NH4>场景描述</NH4>
                  <p>{item.text}</p>

                  <NH4>图标</NH4>
                  <NImage src={item.icon} objectFit='cover' />

                  <NH4>图片</NH4>
                  <NImage src={item.img} objectFit='cover' />
                </NCard>
              </NGridItem>
            )
          })}
        </NGrid>
      </NSpace>
    )
  }
}

export const ProductBlock = defineComponent({
  name: 'ProductBlock',
  props: {
    type: { required: true, type: String as PropType<BlockType> },
    scenario: Array as PropType<ProductScenarioEntity[]>,
    feature: Array as PropType<ProductFeatureEntity[]>,
    spec: Array as PropType<ProductSpecEntity[]>,
    img: Array as PropType<ProductImgEntity[]>
  },
  render() {
    switch (this.type) {
      case 'img':
        return this.img && renderBlockImg(this.img)
      case 'feature':
        return this.feature && renderFeature(this.feature)
      case 'scenario':
        return this.scenario && renderScenario(this.scenario)
      default:
        return null
    }
  }
})
