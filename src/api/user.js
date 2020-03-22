class UserApi {
  constructor(server) {
    server.get('/user/', function(req, res, next) {
      res.send('yupi2');
    })
  }
}
  
export default UserApi