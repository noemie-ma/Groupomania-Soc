const db = require("../models");
const Comment = db.Comment;

//////////////////////////////////////////////////////// CREATION DE COMMENTAIRES SUR LE RS

// Récupération de la liste de tous les commentaires publiés sous les messages
exports.getAllComments = (req, res, next) => {
  Comment.find()
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message,
      });
    });
};

// Création d'un commentaire sous un message
exports.createComment = (req, res, next) => {
  const commentObject = JSON.parse(req.body.comment);
  delete commentObject.id;
  const comment = new Comment({
    userId: req.body.userId,
    messageId: req.body.messageId,
    comment: req.body.comment,
  });
  comment
    .save()
    .then(() =>
      res
        .status(201)
        .json({ message: "Votre commentaire a été publié avec succès" })
    )
    .catch((error) => res.status(400).json({ message: error.message }));
};

// Faire apparaître un seul commentaire
exports.getOneComment = (req, res, next) => {
  Comment.findOne({
    id: req.params.id,
    messageId: req.body.messageId,
    comment: req.body.comment,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

// Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
  console.log("COMMENT DELETION PROCESS");
  console.log(" comment id is: " + req.query.commentId);
  console.log(" comment Uid is : " + req.query.commentUid);
  console.log(" currentUid who ask the deletion is : " + req.query.currentUid);

  console.log(
    " is it the author of the comment who ask the deletion or is he Admin (admin is uid=1 so should be currentUid = 1) ? "
  ) + console.log(" if True => delete the comment ");
  console.log(" if False => unauthorized ");

  Comment.destroy({ where: { id: req.query.commentId } })
    .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};
