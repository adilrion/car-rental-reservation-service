import { SortOrder } from 'mongoose'

export type IPaginationOptions = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: SortOrder
  documentCount?: number
  skip?: number
}

export type IFilterOptions = {
  category?: string
  tag?: string
  status?: string
  search?: string
  author?: string
}
