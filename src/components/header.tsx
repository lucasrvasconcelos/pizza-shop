import { Home, Pizza, UtensilsCrossed } from 'lucide-react'

import { Separator } from '@/components/ui/separator'

import { AccountMenu } from './account-menu'
import { NavLink } from './nav-link'
import { ToggleTheme } from './theme/toggle-theme'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Pizza className="size-6" />
        <Separator orientation="vertical" className="h-6" />
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to={'/'}>
            <Home className="size-4" />
            Dashboard
          </NavLink>
          <NavLink to={'/orders'}>
            <UtensilsCrossed className="size-4" />
            Pedidos
          </NavLink>
        </nav>
        <div className="itemscenter ml-auto flex gap-2">
          <ToggleTheme key={'pizzashop-theme'} />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
