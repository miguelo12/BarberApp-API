import User from "../../model/user";
import jwt from "jsonwebtoken";
import fs from "fs";

export default class UserController {
  constructor(username, password, email) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  authorization() {
    const token_c = req.headers.authorization;
    const token_split = token_c != undefined ? token_c.split(" ") : [];
    if (
      token_split.length == 2 &&
      token_split[0] === "Token" &&
      token_split[1]
    ) {
      var privateKey = fs.readFileSync(__dirname + "/../key/private.key.pub");
      try {
        return jwt.verify(token_split[1], privateKey);
      } catch (err) {
        return false
      }
    } else {
      return false
    }
  }
}
