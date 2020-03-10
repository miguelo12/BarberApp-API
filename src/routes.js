import ApiUser from './api/user';

class Router {
  constructor(server) {
    new ApiUser(server)
  }
}

export default Router;