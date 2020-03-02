import ApiUser from './api/User';

class Router {
  constructor(server) {
    new ApiUser(server)
  }
}

export default Router;