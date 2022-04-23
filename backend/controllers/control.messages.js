const fs = require("fs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;
const Message = db.Message;

///////////////////////////////////////////////////////// CREATION DE MESSAGES SUR LE RS

// Pour faire apparaître les messages
exports.findAllMessages = (req, res, next) => {
  Message.findAll({
    include: { model: User, required: true, attributes: ["prenom", "nom"] },

    order: [["id", "DESC"]],
  })
    .then((messages) => {
      const list = messages.map((message) => {
        return Object.assign(
          {},
          {
            id: message.id,
            UserId: message.userId,
            createdAt: message.createdAt,
            message: message.message,
            image: message.image,
          }
        );
      });
      res.status(200).json({ list });
    })
    .catch((error) => res.status(400).json({ message: error.message }));
};

// Pour créer un poste sur le RS
exports.createMessage = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;
  let image = "";
  if (req.file) {
    image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  }

  console.log("Publié par" + userId);
  const message = new Message({
    userId: userId,
    message: req.body.message,
    image: image,
  });
  console.log("test" + message);
  message
    .save()
    .then(() => res.status(201).json({ message: "Publication réussie" }))
    .catch((error) => res.status(400).json({ message: error.message }));
};

// Pour modifier un message
exports.updateMessage = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;
  if (!userId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    message: req.body.message,
  };

  Message.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};

// Pour effacer le message et ses commentaires, et ses likes
exports.deleteMessage = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;

  if (!userId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  Message.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};
