import { defineStore } from 'pinia'
import { categoryList, type ResultCategoryList } from '@/api/common'

export interface State {
  categoryList: ResultCategoryList[]
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
      const response = await categoryList()
      this.categoryList = response
    }
  }
})
