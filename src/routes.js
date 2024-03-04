import { Router } from "express"
import UserController from "./controller/UserController.js"
import CategoryController from "./controller/CategoryController.js"
import ProductController from "./controller/ProductController.js"

const router = Router()

router.get('/', (req, res) => {
  res.send('Hello, world!')
})

router.route('/auth')
  .post(UserController.authenticateUser)

router.route('/user')
  .post(UserController.createUser)
  .get(UserController.listUsers)

router.route('/user/:id')
  .get(UserController.showUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser)

router.route('/category')
  .post(CategoryController.createCategory)
  .get(CategoryController.listCategories)

router.route('/category/:id')
  .get(CategoryController.showCategory)
  .put(CategoryController.updateCategory)
  .delete(CategoryController.deleteCategory)

router.route('/category/:id/products')
  .get(CategoryController.listProductsByCategory)

router.route('/product')
  .post(ProductController.createProduct)
  .get(ProductController.listProducts)

router.route('/product/:id')
  .get(ProductController.showProduct)
  .put(ProductController.updateProduct)
  .delete(ProductController.deleteProduct)

export { router }
