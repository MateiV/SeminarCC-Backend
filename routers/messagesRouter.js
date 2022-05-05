// messagesRouter.js
const connection = require("../db.js");
const mysql = require("mysql");
const express = require("express");
const router = express.Router();

//get all messages
router.get("/", (req, res) => {
  connection.query("SELECT * FROM messages", (err, results) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      messages: results,
    });
  });
});

//get messages by entryID
router.get("/:id", (req, res) => {
  const {id} = req.params;
  connection.query(`SELECT * FROM messages where entryID = ${mysql.escape(id)}`, (err, results) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      messages: results,
    });
  });
});

//insert a new message
router.post("/", (req, res) => {
 console.log(req.body);
 const {
  senderName,
  senderMail,
  receiverMail,
  messageContent,
} = req.body;
if(!senderName|| !senderMail || !receiverMail || !messageContent){
  return res.status(400).json({
      error: "All fields are required",
  })
}
connection.query(`INSERT INTO messages (senderName, senderMail, receiverMail, messageContent) values (${mysql.escape(senderName)}, ${mysql.escape(senderMail)}, ${mysql.escape(receiverMail)}, ${mysql.escape(messageContent)})`, (err, results) => {
  if (err) {
    return res.send(err);
  }

  return res.json({
    results,
  });
});
});


// Delete a message
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
      // send bad request error
      return res.status(400).send("Bad request. Missing parametres.");
  }
  const queryString = `DELETE FROM messages WHERE entryID = ${mysql.escape(id)}`;
  connection.query(queryString, (err, results) => {
      if (err) {
          return res.send(err);
      }
      if (results.length === 0) {
          return res.status(404).send("Message not found.");
      }
      return res.json({
          results,
      });
    });
});

//Update a message by ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
      // send bad request error
      return res.status(400).send("Bad request. Missing parametres.");
  }
  const { senderName, senderMail, receiverMail, messageContent } = req.body;
  if (!senderName || !senderMail || !receiverMail || !messageContent) {
      // send bad request error
      return res.status(400).send("Bad request. Missing parametres.");
  }
  const queryString = `UPDATE messages SET senderName = ${mysql.escape(senderName)}, senderMail = ${mysql.escape(senderMail)}, receiverMail = ${mysql.escape(receiverMail)}, messageContent = ${mysql.escape(messageContent)} WHERE entryID = ${mysql.escape(id)}`;
  connection.query(queryString, (err, results) => {
      if (err) {
          return res.send(err);
      }
      if (results.length === 0) {
          return res.status(404).send("Message not found.");
      }
      return res.json({
          results,
      });
  });
});

module.exports = router;