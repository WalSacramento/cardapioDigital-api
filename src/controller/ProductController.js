import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default {
  async createProduct(req, res) {
    try {
      const { name, description, ingredients, price, image, categoryId } = req.body

      let product = await prisma.product.findFirst({ where: { name } })

      if (product) {
        return res.status(400).json({ error: "Já existe um produto cadastrado com esse nome" })
      }

      product = await prisma.product.create({
        data: {
          name,
          description,
          ingredients,
          price,
          image,
          categoryId
        }
      })

      return res.status(201).json(product)
    }
    catch (error) {
      console.log(error)
      return res.status(400).json({ error: "Erro ao criar produto" })
    }
  },

  async listProducts(req, res) {
    try {
      const products = await prisma.product.findMany()

      if (!products) {
        return res.status(400).json({ error: "Nenhum produto encontrado" })
      }

      return res.status(200).json(products)
    } catch (error) {
      return res.status(400).json({ error: "Erro ao listar produtos" })
    }
  },

  async showProduct(req, res) {
    try {
      const { id } = req.params

      const product = await prisma.product.findUnique({ where: { id } })

      if (!product) {
        return res.status(400).json({ error: "Produto não encontrado" })
      }

      return res.status(200).json(product)
    } catch (error) {
      return res.status(400).json({ error: "Erro ao buscar produto" })
    }
  },

  async updateProduct(req, res) {
    try {
      const { id } = req.params
      const { name, description, ingredients, price, image, categoryId } = req.body

      let product = await prisma.product.findUnique({ where: { id } })

      if (!product) {
        return res.status(400).json({ error: "Produto não encontrado" })
      }

      product = await prisma.product.update({
        where: { id },
        data: {
          name,
          description,
          ingredients,
          price,
          image,
          categoryId
        }
      })

      return res.status(200).json(product)
    } catch (error) {
      return res.status(400).json({ error: "Erro ao atualizar produto" })
    }
  },

  async deleteProduct(req, res) {
    try {
      const { id } = req.params

      let product = await prisma.product.findUnique({ where: { id } })

      if (!product) {
        return res.status(400).json({ error: "Produto não encontrado" })
      }

      product = await prisma.product.delete({ where: { id } })

      return res.status(200).json(product)
    } catch (error) {
      return res.status(400).json({ error: "Erro ao deletar produto" })
    }
  }

}