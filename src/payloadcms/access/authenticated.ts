import type { AccessArgs } from 'payload'
import { User } from '../../../payload-types'

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const authenticated: isAuthenticated = ({ req: { user } }) => {
  if (user) {
    return true
  }
}
