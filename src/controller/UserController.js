import { PrismaClient } from "@prisma/client";
import pkg from 'bcryptjs';
const { hash, compare } = pkg;

const prisma = new PrismaClient()

export default {
  async createUser(req, res) {
    try {
      const { email, name, password, role } = req.body
      const hashedPassword = await hash(password, 10)

      let user = await prisma.user.findUnique({ where: { email } })

      if (user) {
        return res.status(400).json({ error: "Já existe um usuário cadastrado com esse email" })
      }

      user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          role
        }
      })

      return res.status(201).json(user)
    } catch (error) {
      return res.status(400).json({ error: "Registration failed" })
    }
  },

  async authenticateUser(req, res) {
    try {
      const { email, password } = req.body

      const user = await prisma.user.findUnique({ where: { email } })

      if (!user) {
        return res.status(400).json({ error: "Usuário não encontrado" })
      }

      const passwordMatch = await compare(password, user.password)

      if (!passwordMatch) {
        return res.status(400).json({ error: "Senha incorreta" })
      }

      return res.status(200).json({ user })
    } catch (error) {
      return res.status(400).json({ error: "Falha na autenticação" })
    }
  },

  async listUsers(req, res) {
    try {
      const users = await prisma.user.findMany()

      return res.status(200).json(users)
    } catch (error) {
      return res.status(400).json({ error: "Erro ao listar usuários" })
    }
  },

  async showUser(req, res) {
    try {
      const { id } = req.params

      const user = await prisma.user.findUnique({ where: { id } })

      return res.status(200).json(user)
    } catch (error) {
      return res.status(400).json({ error: "Erro ao encontrar usuário" })
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params
      const { email, name, password, role } = req.body

      const hashedPassword = await hash(password, 10)

      let user = await prisma.user.findUnique({ where: { id } })

      if (!user) {
        return res.status(400).json({ error: "Usuário não encontrado" })
      }

      user = await prisma.user.update({
        where: { id },
        data: {
          email,
          name,
          password: hashedPassword,
          role
        }
      })

      return res.status(200).json(user)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: "Erro ao atualizar usuário" })
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params

      const user = prisma.user.findUnique({ where: { id } })

      if (!user) {
        return res.status(400).json({ error: "Usuário não encontrado" })
      }

      await prisma.user.delete({ where: { id } })

      return res.status(204).send(user)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: "Erro ao deletar usuário" })
    }
  }
}

