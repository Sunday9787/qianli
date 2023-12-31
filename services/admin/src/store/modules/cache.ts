import { defineStore } from 'pinia'
import {
  CategoryEntity,
  DepartmentEntity,
  type CategoryEntityJSON,
  type DepartmentEntityJSON
} from '@/service/common.entity'

export interface State {
  loading: boolean
  categoryList: CategoryEntityJSON[]
  departmentList: DepartmentEntityJSON[]
}

export const useCacheModule = defineStore('cacheModule', {
  state() {
    return {
      loading: false,
      categoryList: [],
      departmentList: []
    } as State
  },
  getters: {
    optionsPostCategory: state => state.categoryList.filter(item => item.type === 'post'),
    optionsProductCategory: state => state.categoryList.filter(item => item.type === 'product'),
    categoryMap: state => new Map(state.categoryList.map(item => [item.id, item])),
    departmentMap: state => new Map(state.departmentList.map(item => [item.id, item]))
  },
  actions: {
    async cache() {
      this.loading = true

      try {
        await Promise.all([this.cacheCategory(), this.cacheDepartment()])
      } finally {
        this.loading = false
      }
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
