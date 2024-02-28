import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from './ui/button'

interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
  handlePageOrder: (page: number) => Promise<void> | void
}

export function Pagination({
  pageIndex,
  perPage,
  totalCount,
  handlePageOrder,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} iten(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex + 1} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={'outline'}
            onClick={() => handlePageOrder(0)}
            disabled={pageIndex === 0}
            className="size-8 p-0"
          >
            <ChevronsLeft className="size-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button
            variant={'outline'}
            onClick={() => handlePageOrder(pageIndex - 1)}
            disabled={pageIndex === 0}
            className="size-8 p-0"
          >
            <ChevronLeft className="size-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            variant={'outline'}
            onClick={() => handlePageOrder(pageIndex + 1)}
            disabled={pageIndex >= pages - 1}
            className="size-8 p-0"
          >
            <ChevronRight className="size-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button
            variant={'outline'}
            onClick={() => handlePageOrder(pages - 1)}
            disabled={pageIndex >= pages - 1}
            className="size-8 p-0"
          >
            <ChevronsRight className="size-4" />
            <span className="sr-only">Útima página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
