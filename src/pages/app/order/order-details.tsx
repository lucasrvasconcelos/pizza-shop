import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function OrderDetails() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido {'151515'}</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-slate-400" />
                  <span className="font-medium text-muted-foreground">
                    Pendente
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell className="flex justify-end">
                Lucas rodrigues
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Telefone</TableCell>
              <TableCell className="flex justify-end">
                (85) 98928-5385
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Email</TableCell>
              <TableCell className="flex justify-end">
                lucasvasconcelos900@gmail.com
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Realizado há
              </TableCell>
              <TableCell className="flex justify-end">há 1 hora</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <ScrollArea className="h-[150px]">
          <Table className="relative">
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Qtd</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="w-full">
                <TableCell>Pizza Pepperoni Família</TableCell>
                <TableCell className="text-right">2</TableCell>
                <TableCell className="text-right">R$ 69,90</TableCell>
                <TableCell className="text-right">R$ 139,80</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Pizza Pepperoni Família</TableCell>
                <TableCell className="text-right">2</TableCell>
                <TableCell className="text-right">R$ 49,90</TableCell>
                <TableCell className="text-right">R$ 119,80</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Pizza Pepperoni Família</TableCell>
                <TableCell className="text-right">2</TableCell>
                <TableCell className="text-right">R$ 49,90</TableCell>
                <TableCell className="text-right">R$ 119,80</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Pizza Pepperoni Família</TableCell>
                <TableCell className="text-right">2</TableCell>
                <TableCell className="text-right">R$ 49,90</TableCell>
                <TableCell className="text-right">R$ 119,80</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Pizza Pepperoni Família</TableCell>
                <TableCell className="text-right">2</TableCell>
                <TableCell className="text-right">R$ 49,90</TableCell>
                <TableCell className="text-right">R$ 119,80</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ScrollArea>

        <div className="flex justify-between rounded-sm bg-green-400/90 px-4 py-2 text-green-950/80 ring-2 ring-green-900">
          <span className="text-sm font-bold">Total do pedido</span>
          <span className="text-sm font-bold">R$ 259,60</span>
        </div>
      </div>
    </DialogContent>
  )
}
