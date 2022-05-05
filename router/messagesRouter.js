const express = require('express')
const router = express.Router();
const connection = require('../db');
const mysql = require('mysql')

// Get all messages
router.get("/", (req, res) => {
    connection.query("SELECT * FROM messages", (err, results) => {
      if (err) {
        console.log(err)
        return res.send(err);
      }
  
      return res.json({
        messages: results,
      });
    });
});

//Get a message by id
router.get("/:id", (req, res) => {
  const {id} = req.params
  connection.query(`SELECT * FROM messages where entryId = ${mysql.escape(id)}`, (err, results) => {
    if (err) {
      console.log(err)
      return res.send(err);
    }

    if(results.length){
      return res.status(400).json({
        error: "Message not found",
      })
    }

    return res.json({
      messages: results,
    });
  });
});

// Insert a new message
router.post("/", (req, res) => {
  console.log(req.body);
  const {
    senderName,
    senderMail,
    receiverMail,
    messageContent
  } = req.body;

  if (!senderName || !senderMail || !receiverMail || !messageContent){
    return res.status(400).json({
      error: "All fields are required",
    })
  }

  connection.query(`insert into messages (senderName, senderMail, receiverMail, messageContent) values (${mysql.escape(senderName)}, ${mysql.escape(senderMail)}, ${mysql.escape(receiverMail)}, ${mysql.escape(messageContent)})`, (err, results) => {
    if (err) {
      console.log(err)
      return res.send(err);
    }

    return res.json({
      messages: results,
    });
  });
});

// Delete a message
router.delete("/:id", (req, res)=>{
  const { id } = req.params;
  connection.query(`DELETE FROM messages WHERE entryID = ${mysql.escape(id)}`, (err, results)=>{
    if (err) {
      console.log(err)
      return res.send(err);
    }

    return res.json({
      results,
    });
  })
})

// Update a message
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const {
    senderName,
    senderMail,
    receiverMail,
    messageContent
  } = req.body;

  if (!senderName || !senderMail || !receiverMail || !messageContent){
    return res.status(400).json({
      error: "All fields are required",
    })
  }

  connection.query(`UPDATE messages SET senderName = ${mysql.escape(senderName)}, 
                                        senderMail = ${mysql.escape(senderMail)}, 
                                        receiverMail = ${mysql.escape(receiverMail)}, 
                                        messageContent = ${mysql.escape(messageContent)} 
                    WHERE entryID = ${mysql.escape(id)}`, (err, results) => {
    if (err) {
      return res.send(err);
    }
    if (results.length === 0) {
        return res.status(404).send("Message not found.");
    }
    return res.json({
        results,
    });
  })
})

module.exports = router;