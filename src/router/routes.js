// NATIVE
import { Router } from 'restify-router'

// API
import LoginUser from '../api/auth/login'


export default class Routers {
  constructor() {
    const router = new Router()
    router.add("/auth", new LoginUser())
    return router
  }
}