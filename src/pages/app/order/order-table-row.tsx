import { ArrowRight, Search, X } from 'lucide-react'

import { Order } from '@/api/get-orders'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { currencyConverter, distanceDate } from '@/lib/utils'

import { OrderDetails } from './order-details'
import { OrderStatus } from './order-status'

interface OrderTableRoqProps {
  order: Order
}

export function OrderTableRow({ order }: OrderTableRoqProps) {
  console.log(order.createdAt)
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size={'xs'}>
              <Search className="size-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-sm font-medium">
        {order.oderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {distanceDate(order.createdAt)}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {currencyConverter(order.total)}
      </TableCell>
      <TableCell>
        <Button variant={'outline'} size={'xs'}>
          <ArrowRight className="mr-2 size-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant={'ghost'} size={'xs'}>
          <X className="mr-2 size-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
