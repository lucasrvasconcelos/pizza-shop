import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  getManagerRestaurant,
  GetManagerRestaurantResponse,
} from '@/api/get-manager-restaurant'
import { updateProfile } from '@/api/update-profile'

import { Button } from './ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
})

type StoreProfileType = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
  const queryClient = useQueryClient()

  const { data: managerRestaurante } = useQuery({
    queryKey: ['get-manager-restaurant'],
    queryFn: getManagerRestaurant,
    staleTime: Infinity,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<StoreProfileType>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managerRestaurante?.name ?? '',
      description: managerRestaurante?.description ?? '',
    },
  })

  function updateProfileCached({ name, description }: StoreProfileType) {
    const cached = queryClient.getQueryData<GetManagerRestaurantResponse>([
      'get-manager-restaurant',
    ])

    if (cached) {
      queryClient.setQueryData<GetManagerRestaurantResponse>(
        ['get-manager-restaurant'],
        {
          ...cached,
          name,
          description,
        },
      )
    }

    return { cached }
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate: ({ name, description }) => {
      const { cached } = updateProfileCached({ name, description })
      return { profileCached: cached }
    },
    onError: (_, __, context) => {
      if (context?.profileCached) {
        updateProfileCached(context?.profileCached)
      }
    },
  })

  async function handleUpdateStoreProfile({
    name,
    description,
  }: StoreProfileType) {
    try {
      await updateProfileFn({ name, description })
      toast.success('Dados alterados com sucesso')
    } catch (error) {
      toast.error('Erro na alteração dos dados, tente novamente')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateStoreProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-3" id="name" {...register('name')} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>

            <Textarea
              className="col-span-3 h-[150px] resize-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              id="description"
              {...register('description')}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'ghost'} type="button" onClick={() => reset()}>
              Cancelar
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button variant={'success'} type="submit" disabled={isSubmitting}>
              Salvar
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
