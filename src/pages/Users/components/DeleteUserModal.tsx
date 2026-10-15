import { Modal } from '@/components/Modal/index.tsx'
import { Button } from '@/components/Button/index.tsx'
import type { DashboardUser } from '@/services/types/user.ts'

type DeleteUserModalProps = {
  user: DashboardUser | null
  onClose: () => void
  onConfirm: (user: DashboardUser) => void
}

export function DeleteUserModal({ user, onClose, onConfirm }: DeleteUserModalProps) {
  return (
    <Modal
      open={Boolean(user)}
      title="Delete user"
      description={user ? `${user.name} will be removed from this browser. This does not call the API.` : undefined}
      onClose={onClose}
    >
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            if (!user) return
            onConfirm(user)
            onClose()
          }}
        >
          Delete
        </Button>
      </div>
    </Modal>
  )
}
