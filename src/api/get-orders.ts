import { api } from '@/lib/axios'

export type Ordertype =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

export interface Order {
  oderId: number
  createdAt: string
  status: Ordertype
  customerName: string
  total: number
}

export interface GetOrdersParams {
  pageIndex?: number | null
}

export interface GetOrdersBody {
  orders: Order[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}
export async function getOrders({ pageIndex }: GetOrdersParams) {
  const response = await api.get<GetOrdersBody>('/orders', {
    params: {
      pageIndex,
    },
  })

  return response.data
}
