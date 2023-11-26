import { defineStore } from 'pinia'
import {
  CategoryEntity,
  DepartmentEntity,
  type CategoryEntityJSON,
  type DepartmentEntityJSON
} from '@/service/common.entity'

export interface State {
  categoryList: CategoryEntityJSON[]
  departmentList: DepartmentEntityJSON[]
}

export const useCacheModule = defineStore('cacheModule', {
  state() {
    return {
      categoryList: [],
      departmentList: []
    } as State
  },
  getters: {
    optionsPostCategory: state => state.categoryList.filter(item => item.type === 'post'),
    optionsProductCategory: state => state.categoryList.filter(item => item.type === 'product'),
    departmentMap: state => new Map(state.departmentList.map(item => [item.id, item]))
  },
  actions: {
    cache() {
      this.cacheCategory()
      this.cacheDepartment()
    },
    async cacheCategory() {
      const response = await CategoryEntity.select()
      this.categoryList = response
    },
    async cacheDepartment() {
      const response = await DepartmentEntity.select()
      this.departmentList = response
    }
  }
})
