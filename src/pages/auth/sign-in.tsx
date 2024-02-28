import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schemaSignIn = z.object({
  email: z.string().email(),
})

type SignInType = z.infer<typeof schemaSignIn>

export function SignIn() {
  /*
  // Função para fazer o login
  */

  const [params] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInType>({
    resolver: zodResolver(schemaSignIn),
    defaultValues: {
      email: params.get('email') ?? '',
    },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInType) {
    await authenticate({ email: data.email }).catch((e) => {
      console.log(e)
    })
    toast.success('Enviamos o link de acesso para seu email')
  }

  return (
    <div className="p-8">
      <Helmet title="Login" />
      <Button variant={'ghost'} asChild className="absolute right-8 top-8">
        <Link to={'/sign-up'}>Cadastrar estabelecimento</Link>
      </Button>
      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acessar painel
          </h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe suas vendas pelo painel do parceiro
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
          <div className="space-y-2">
            <Label htmlFor="email">Seu email</Label>
            <Input id="email" {...register('email')} />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Acessar painel
          </Button>
        </form>
      </div>
    </div>
  )
}
