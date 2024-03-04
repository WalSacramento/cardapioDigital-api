import { Router } from "express"
import UserController from "./controller/UserController.js"

const router = Router()

router.get('/', (req, res) => {
  res.send('Hello, world!')
})

router.route('/user')
  .post(UserController.createUser)
  .get(UserController.listUsers)

router.route('/user/:id')
  .get(UserController.showUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser)

router.route('/auth')
  .post(UserController.authenticateUser)

export { router }