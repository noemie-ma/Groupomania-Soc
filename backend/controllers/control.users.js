// Importation des élément utilisés dans le code
const db = require("../models");
const User = db.User;
const jwt = require("jsonwebtoken");

//////////////////////////////////////////// PROFIL DE L'UTILISATEUR

// Trouve un compte demandé dans la db
exports.findOneAccount = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      res.status(200).json({
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        bio: user.bio,
        createdAt: user.createdAt,
        isAdmin: user.isAdmin,
      });
    })
    .catch((error) => res.status(404).json({ message: error.message }));
};

// Mise à jour d'un compte
exports.updateThisAccount = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const id = decodedToken.id;

  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      if (user.id == id) {
        const userObject = req.file
          ? {
              ...JSON.parse(req.body.user),
            }
          : { ...req.body };
        User.updateOne(
          {
            where: {
              id: req.params.id,
            },
          },
          { ...userObject, id: req.params.id }
        )
          .then(() =>
            res.status(200).json({
              message:
                "Les paramètres utilisateurs ont été modifiés avec succès",
            })
          )
          .catch((error) => res.status(400).json({ message: error.message }));
      } else {
        res.status(403).json({ message: "Modification non autorisé" });
      }
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

// Efface "mon" compte (quand vous voulez l'effacer)
exports.deleteMyAccount = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const id = decodedToken.id;
  const isAdmin = decodedToken.isAdmin;

  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      if (user.id == id || isAdmin) {
        const userObject = req.file
          ? {
              ...JSON.parse(req.body.user),
            }
          : { ...req.body };
        User.destroy({ where: { ...userObject, id: req.params.id } })
          .then(() =>
            res.status(200).json({
              message: "La suppression du compte a été réalisée avec succès",
            })
          )
          .catch((error) => res.status(400).json({ message: error.message }));
      } else {
        res.status(403).json({ message: "Suppression de compte non autorisé" });
      }
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};
