// NATIVE
import { Router } from 'restify-router'

// API
import ApiUser from '../api/auth/login'


export default class Routers {
  constructor(jwt) {
    const router = new Router()
    router.add("/auth", new ApiUser(jwt))
    return router
  }
}