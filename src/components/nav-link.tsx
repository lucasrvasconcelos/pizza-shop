import { Link, LinkProps, useLocation } from 'react-router-dom'

export function NavLink(rest: LinkProps) {
  const { pathname } = useLocation()
  return (
    <Link
      data-pathname={pathname === rest.to}
      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[pathname=true]:text-foreground"
      {...rest}
    ></Link>
  )
}
