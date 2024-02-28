import { useMutation, useQuery } from '@tanstack/react-query'
import { Building, ChevronDown, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { getManagerRestaurant } from '@/api/get-manager-restaurant'
import { getProfile } from '@/api/get-profile'
import { SignOut } from '@/api/sign-out'

import { StoreProfileDialog } from './store-profile-dialog'
import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export function AccountMenu() {
  const navigate = useNavigate()

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
  })

  const { data: managerRestaurante, isLoading: isLoadingManegerRestaurant } =
    useQuery({
      queryKey: ['get-manager-restaurant'],
      queryFn: getManagerRestaurant,
      staleTime: Infinity,
    })

  const { mutateAsync: SignOutFn, isPending: isSignOut } = useMutation({
    mutationFn: SignOut,
    onSuccess: () => {
      navigate('/sign-in', { replace: true })
    },
  })

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={'outline'}
            className="flex select-none items-center gap-2"
          >
            {isLoadingManegerRestaurant ? (
              <Skeleton className="h-6 min-w-40" />
            ) : (
              managerRestaurante?.name
            )}
            <ChevronDown className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingProfile ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            ) : (
              <>
                <span>{profile?.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {profile?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className="mr-2 size-4" />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuLabel asChild>
            <button
              onClick={() => SignOutFn()}
              className={`flex w-full items-center text-rose-500 disabled:cursor-not-allowed dark:text-rose-400 ${isSignOut && 'animate-pulse'}`}
              disabled={isSignOut}
            >
              <LogOut className="mr-2 size-4" />
              <span>Sair</span>
            </button>
          </DropdownMenuLabel>

          {/* <DropdownMenuItem
            className="text-rose-500 dark:text-rose-400"
            asChild
          >
            <button
              onClick={() => SignOutFn()}
              className="w-full"
              disabled={isSignOut}
            >
              <LogOut className="mr-2 size-4" />
              <span>Sair</span>
            </button>
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog />
    </Dialog>
  )
}
