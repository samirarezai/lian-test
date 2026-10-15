import { useForm } from 'react-hook-form'
import { Modal } from '@/components/Modal/index.tsx'
import { TextField } from '@/components/form/TextField.tsx'
import { Button } from '@/components/Button/index.tsx'
import type { CreateUserInput } from '@/services/types/user.ts'

type AddUserModalProps = {
  open: boolean
  emails: ReadonlySet<string>
  onClose: () => void
  onAdd: (input: CreateUserInput) => void
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function AddUserModal({ open, emails, onClose, onAdd }: AddUserModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserInput>({
    defaultValues: { name: '', email: '', companyName: '' },
    mode: 'onTouched',
  })

  const close = () => {
    reset()
    onClose()
  }

  const submit = handleSubmit((values) => {
    onAdd(values)
    reset()
    onClose()
  })

  return (
    <Modal
      open={open}
      title="Add user"
      description="Saved in this browser only. New users are not sent to the API."
      onClose={close}
    >
      <form className="grid gap-4" onSubmit={submit} noValidate>
        <TextField
          label="Name"
          autoComplete="name"
          {...register('name', {
            validate: (value) => {
              const name = value.trim()
              if (!name) return 'Name is required'
              if (name.length < 2) return 'Name must be at least 2 characters'
              if (name.length > 80) return 'Name must be 80 characters or fewer'
              return true
            },
          })}
          error={errors.name?.message}
        />
        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          {...register('email', {
            validate: (value) => {
              const email = value.trim()
              if (!email) return 'Email is required'
              if (!emailPattern.test(email)) return 'Enter a valid email'
              if (emails.has(email.toLowerCase())) return 'A user with this email already exists'
              return true
            },
          })}
          error={errors.email?.message}
        />
        <TextField
          label="Company"
          autoComplete="organization"
          {...register('companyName', {
            validate: (value) => {
              const company = value.trim()
              if (!company) return 'Company is required'
              if (company.length < 2) return 'Company must be at least 2 characters'
              if (company.length > 80) return 'Company must be 80 characters or fewer'
              return true
            },
          })}
          error={errors.companyName?.message}
        />
        <div className="flex justify-end gap-2 pt-1">
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>
          <Button type="submit">Save user</Button>
        </div>
      </form>
    </Modal>
  )
}
