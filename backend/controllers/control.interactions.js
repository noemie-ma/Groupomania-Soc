const db = require("../models");
const Interaction = db.Interaction;

// ADOPTION D'UN FORMAT LIKES/DISLIKE UNIQUEMENT SUR LES MESSAGES
exports.interactions = (req, res, next) => {
  if (req.body.like === 1) {
    Interaction.updateOne(
      { id: req.params.id },
      {
        $inc: { likes: req.body.like++ },
        $push: { usersLiked: req.body.id },
      }
    )
      .then((message) =>
        res.status(200).json({ message: "Le like a été ajouté avec succès" })
      )
      .catch((error) => res.status(400).json({ message: error.message }));
  } else if (req.body.like === -1) {
    Interaction.updateOne(
      { id: req.params.id },
      {
        $inc: { dislikes: req.body.like++ * -1 },
        $push: { usersDisliked: req.body.id },
      }
    )
      .then((message) =>
        res.status(200).json({ message: "Le dislike a été ajouté avec succès" })
      )
      .catch((error) => res.status(400).json({ error }));
  } else {
    Interaction.findOne({ id: req.params.id })
      .then((message) => {
        if (message.usersLiked.includes(req.body.id)) {
          Interaction.updateOne(
            { id: req.params.id },
            { $pull: { usersLiked: req.body.id }, $inc: { likes: -1 } }
          )
            .then((message) => {
              res.status(200).json({ message: "Like supprimé !" });
            })
            .catch((error) => res.status(400).json({ error }));
        } else if (message.usersDisliked.includes(req.body.id)) {
          Interaction.updateOne(
            { id: req.params.id },
            {
              $pull: { usersDisliked: req.body.id },
              $inc: { dislikes: -1 },
            }
          )
            .then((message) => {
              res
                .status(200)
                .json({ message: "Le dislike a été supprimé avec succès" });
            })
            .catch((error) => res.status(400).json({ message: error.message }));
        }
      })
      .catch((error) => res.status(400).json({ message: error.message }));
  }
};
