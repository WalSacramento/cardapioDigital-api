import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default {
  async createCategory(req, res) {
    try {
      const { name } = req.body

      let category = await prisma.category.findFirst({ where: { name } })

      if (category) {
        return res.status(400).json({ error: "Já existe uma categoria cadastrada com esse nome" })
      }

      category = await prisma.category.create({
        data: {
          name
        }
      })

      return res.status(201).json(category)
    }

    catch (error) {
      return res.status(400).json({ error: "Erro ao criar categoria" })
    }
  },

  async listCategories(req, res) {
    try {
      const categories = await prisma.category.findMany()

      if (!categories) {
        return res.status(400).json({ error: "Nenhuma categoria encontrada" })
      }

      return res.status(200).json(categories)
    } catch (error) {
      return res.status(400).json({ error: "Erro ao listar categorias" })
    }
  },

  async showCategory(req, res) {
    try {
      const { id } = req.params

      const category = await prisma.category.findUnique({ where: { id } })

      if (!category) {
        return res.status(400).json({ error: "Categoria não encontrada" })
      }

      return res.status(200).json(category)
    } catch (error) {
      return res.status(400).json({ error: "Erro ao buscar categoria" })
    }
  },

  async updateCategory(req, res) {
    try {
      const { id } = req.params
      const { name } = req.body

      let category = await prisma.category.findUnique({ where: { id } })

      if (!category) {
        return res.status(400).json({ error: "Categoria não encontrada" })
      }

      category = await prisma.category.update({
        where: { id },
        data: {
          name
        }
      })

      return res.status(200).json(category)
    } catch (error) {
      return res.status(400).json({ error: "Erro ao atualizar categoria" })
    }
  },

  async deleteCategory(req, res) {
    try {
      const { id } = req.params

      let category = await prisma.category.findUnique({ where: { id } })

      if (!category) {
        return res.status(400).json({ error: "Categoria não encontrada" })
      }

      category = await prisma.category.delete({ where: { id } })

      return res.status(200).json(category)
    } catch (error) {
      return res.status(400).json({ error: "Erro ao deletar categoria" })
    }
  }
}