const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { username, password, isAdmin } = req.body;

    let user = await db.get_user(username);

    if (user[0]) {
      return res.status(409).send("Username already taken");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    let createUserResponse = await db.register_user(isAdmin, username, hash);
    let result = createUserResponse[0];

    req.session.user = {
      is_admin: result.is_admin,
      id: result.id,
      username: result.username
    };
    res.send(req.session.user);
  },

  login: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;

    let foundUser = await db.get_user(username);
    let user = foundUser[0];

    if (!user) {
      return res.status(401).send("Username doesnt exist please register");
    }

    const isAuthenticated = bcrypt.compareSync(password, user.hash);

    if (!isAuthenticated) {
      return res.status(403).send("Wrong password");
    }

    req.session.user = {
      is_admin: user.is_admin,
      id: user.id,
      username: user.username
    };
    return res.send(req.session.user);
  },

  logout: (req,res) => {
	req.session.destroy()
	res.sendStatus(200)
  }
};
