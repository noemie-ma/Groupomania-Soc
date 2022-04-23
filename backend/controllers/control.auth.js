const db = require("../models");
const bcrypt = require("bcrypt");
const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = db.User;

//////////////////////////////////////////// PAGE DE CONNEXION ET INSCRIPTION

// Inscription au réseau social (avec hash du mot de passe et chiffrage du mail)
exports.signup = (req, res, next) => {
  console.log(JSON.stringify(req.body));
  const emailCryptoJs = cryptojs
    .HmacSHA256(req.body.email, "CLE_SECRETE")
    .toString();

  console.log(emailCryptoJs);

  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: emailCryptoJs,
      password: hash,
      isAdmin: false,
    });
    user
      .save()
      .then((response) => {
        res.status(201).json({
          message: "Un nouvel utilisateur a été créé",
          result: response,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: error.message,
        });
      });
  });
};

// Connexion au réseau social
exports.login = (req, res, next) => {
  const emailCryptoJs = cryptojs
    .HmacSHA256(req.body.email, "CLE_SECRETE")
    .toString();

  console.log(emailCryptoJs);

  if (!emailCryptoJs || !req.body.password) {
    return res.status(400).json({
      message:
        "Il manque un élément dans le formualire de connexion. Veuillez le compléter.",
    });
  }

  User.findOne({
    where: {
      email: emailCryptoJs,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
          }
          res.status(200).json({
            message: "Connexion réussie",
            id: user.id,
            isAdmin: user.isAdmin,
            nom: user.nom,
            prenom: user.prenom,
            token: jwt.sign(
              { userId: user.id, isAdmin: user.isAdmin },
              "RANDOM_TOKEN_SECRET",
              {
                expiresIn: "5min",
              }
            ),
          });
        })
        .catch((error) => res.status(500).json({ message: error.message }));
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};
