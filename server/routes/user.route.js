import express from 'express'

const userRouter = express.Router()

userRouter.post('register',userRegister)
userRouter.post('login',userLogin)

export default userRouter;