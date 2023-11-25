import type { DeepReadonly } from 'vue'
import { defineStore } from 'pinia'
import { CategoryEntity, type CategoryEntityJSON } from '@/service/common.entity'

export interface State {
  categoryList: ReadonlyArray<DeepReadonly<CategoryEntityJSON>>
}

export const useCacheModule = defineStore('cacheModule', {
  state() {
    return {
      categoryList: []
    } as State
  },
  getters: {
    optionsPostCategory: state => state.categoryList.filter(item => item.type === 'post'),
    optionsProductCategory: state => state.categoryList.filter(item => item.type === 'product')
  },
  actions: {
    cache() {
      this.queryCategoryList()
    },
    async queryCategoryList() {
      const response = await CategoryEntity.select()
      this.categoryList = response
    }
  }
})
