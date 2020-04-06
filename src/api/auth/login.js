import { Router } from "restify-router";
import User from "../../model/user";

//import errs from 'restify-errors'

export default class UserApi {
  constructor(jwt) {
    this.router = new Router();
    this.jwt = jwt;
    return this.build();
  }

  build() {
    this.router.get("/user/", async function(req, res, next) {
      //const { body } = req;
      //const { username } = body;
      //const { password } = body;

      //jwt.sign({user}, 'privatekey', { expiresIn: '1h' },(err, token) => {
      //  if(err) { console.log(err) }
      //  res.send(token);
      //});
      const user = await User.query().findById(1);
      res.send(user);
      next();
    });

    this.router.get("/user/data", function(req, res, next) {
      //const { body } = req;
      //const { username } = body;
      //const { password } = body;

      //jwt.sign({user}, 'privatekey', { expiresIn: '1h' },(err, token) => {
      //  if(err) { console.log(err) }
      //  res.send(token);
      //});
      next();
    });

    return this.router;
  }
}
