import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { storageKeys } from '@/constants/storage.ts'
import { queryClient } from '@/helpers/query/index.ts'
import { queryClientKeys } from '@/helpers/query/queryClientKeys.ts'
import { readStorage, writeStorage } from '@/helpers/storage.ts'
import { createLocalUser, mergeUsers, parseDeletedIds, parseLocalUsers } from '@/handler/users.ts'
import { userAPI } from '@/services/user.ts'
import type { CreateUserInput, DashboardUser } from '@/services/types/user.ts'

const emptyUsers: DashboardUser[] = []
const emptyIds: string[] = []

export function useUsersDashboard() {
  const query = useQuery({
    queryKey: [queryClientKeys.USERS],
    queryFn: userAPI.getUsers,
  })

  const [localUsers, setLocalUsers] = useState<DashboardUser[]>(() =>
    readStorage(storageKeys.localUsers, emptyUsers, parseLocalUsers),
  )
  const [deletedIds, setDeletedIds] = useState<string[]>(() =>
    readStorage(storageKeys.deletedUserIds, emptyIds, parseDeletedIds),
  )

  useEffect(() => {
    writeStorage(storageKeys.localUsers, localUsers)
  }, [localUsers])

  useEffect(() => {
    writeStorage(storageKeys.deletedUserIds, deletedIds)
  }, [deletedIds])

  const addUser = (input: CreateUserInput) => {
    setLocalUsers((current) => [...current, createLocalUser(input)])
  }

  const deleteUser = (user: DashboardUser) => {
    if (user.source === 'local') {
      setLocalUsers((current) => current.filter((item) => item.id !== user.id))
    } else {
      setDeletedIds((current) => (current.includes(user.id) ? current : [...current, user.id]))
    }

    void queryClient.invalidateQueries({ queryKey: [queryClientKeys.USER, user.id] })
  }

  const users = useMemo(
    () => mergeUsers(query.data ?? emptyUsers, localUsers, deletedIds),
    [query.data, localUsers, deletedIds],
  )

  return {
    users,
    isPending: query.isPending,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    addUser,
    deleteUser,
  }
}
