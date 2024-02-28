import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerRestaurant } from '@/api/register'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schemaSignUp = z.object({
  manager: z.string(),
  companyName: z.string(),
  email: z.string().email(),
  phone: z.string(),
})

type SignUpType = z.infer<typeof schemaSignUp>

export function SignUp() {
  /*
  // Função para fazer o login
  */
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpType>({
    resolver: zodResolver(schemaSignUp),
  })

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  })
  async function handleSignUp(data: SignUpType) {
    try {
      toast.info('Criando sua conta...')

      await registerRestaurantFn({
        restaurantName: data.companyName,
        managerName: data.manager,
        email: data.email,
        phone: data.phone,
      })

      // await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.dismiss()
      toast.success('Conta criada', {
        action: {
          label: 'Acessar minha conta',
          onClick: () => {
            navigate(`/sign-in?email=${data.email}`)
            toast.dismiss()
          },
        },
        actionButtonStyle: {
          backgroundColor: '#008a2e',
        },
      })
    } catch {
      toast.error('Erro na criação da sua conta')
    }
  }

  return (
    <div className="p-8">
      <Helmet title="Login" />
      <Button variant={'ghost'} asChild className="absolute right-8 top-8">
        <Link to={'/sign-in'}>Fazer login</Link>
      </Button>
      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Criar conta grátis
          </h1>
          <p className="text-sm text-muted-foreground">
            Seja um parceiro e comece suas vendas
          </p>
        </div>
        <form className="space-y-3" onSubmit={handleSubmit(handleSignUp)}>
          <div className="space-y-2">
            <Label htmlFor="companyName">Nome do estabelecimento</Label>
            <Input id="companyName" type="text" {...register('companyName')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="manager">Seu nome</Label>
            <Input id="manager" type="text" {...register('manager')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Seu email</Label>
            <Input id="email" {...register('email')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Seu celular</Label>
            <Input id="phone" type="tel" {...register('phone')} />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Finalizar cadastro
          </Button>
        </form>
        <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
          Ao criar conta você concorda com nossos{' '}
          <a href="#" className="underline underline-offset-8">
            termos de serviço
          </a>{' '}
          e{' '}
          <a href="#" className="underline underline-offset-8">
            política de privacidade
          </a>
        </p>
      </div>
    </div>
  )
}
