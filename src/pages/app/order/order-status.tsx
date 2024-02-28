import { Ordertype } from '@/api/get-orders'

const orderStatusMap: Record<Ordertype, string> = {
  pending: 'Pendente',
  canceled: 'Cancelado',
  delivered: 'Entregue',
  delivering: 'Em entrega',
  processing: 'Em preparo',
}

interface OrderStatusProps {
  status: Ordertype
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === 'pending' && (
        <span className="size-2 rounded-full bg-rose-400" />
      )}

      {status === 'canceled' && (
        <span className="size-2 rounded-full bg-slate-400" />
      )}

      {status === 'delivered' && (
        <span className="size-2 rounded-full bg-emerald-400" />
      )}

      {['processing', 'delivering'].includes(status) && (
        <span className="size-2 rounded-full bg-amber-400" />
      )}

      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status]}
      </span>
    </div>
  )
}
