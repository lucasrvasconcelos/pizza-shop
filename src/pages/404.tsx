import { Link, useLocation } from 'react-router-dom'

export function NotFound() {
  const { pathname } = useLocation()
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">
        Página &quot;
        {pathname.length > 12
          ? pathname.substring(0, 12).concat('...')
          : pathname}
        &quot; Não encontrada
      </h1>
      <p className="text-accent-foreground">
        Voltar para o{' '}
        <Link to={'/'} className="text-sky-500 dark:text-sky-400">
          Dashboard
        </Link>
      </p>
    </div>
  )
}
