import { Router } from "restify-router";
//import errs from 'restify-errors'

export default class LoginApi {
  constructor() {
    this.router = new Router();
    return this.build();
  }

  build() {
    this.router.get("/sign/", async function (req, res, next) {
      var privateKey = fs.readFileSync(__dirname + "/../key/private.key");
      var token = jwt.sign({ foo: "bar" }, privateKey, {
        expiresIn: "1h",
        algorithm: "RS256",
      });
      //const { body } = req;
      //const { username } = body;
      //const { password } = body;

      //jwt.sign({user}, 'privatekey', { expiresIn: '1h' },(err, token) => {
      //  if(err) { console.log(err) }
      //  res.send(token);
      //});
      const user = await User.query().findById(1);
      res.send(token);
      next();
    });

    this.router.get("/verify/", async function (req, res, next) {
      const token_c = req.headers.authorization;
      const token_split = token_c != undefined ? token_c.split(" ") : [];
      if (
        token_split.length == 2 &&
        token_split[0] === "Token" &&
        token_split[1]
      ) {
        var privateKey = fs.readFileSync(
          __dirname + "/../key/private.key.pub"
        );
        try {
          var decoded = jwt.verify(token_split[1], privateKey);
        } catch (err) {
          res.send({ error: "wtf catch" });
        }
        res.send(decoded);
      } else {
        res.send({ error: "wtf" });
      }
      next();
    });

    return this.router;
  }
}
