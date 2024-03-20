
import bcrypt from 'bcrypt'

export class encryptImplementation {
  async hash (password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword
  }

  async compare (password: string, hashedPassword: string): Promise<boolean> {
    const match = await bcrypt.compare(password, hashedPassword)
    return match
  }
}