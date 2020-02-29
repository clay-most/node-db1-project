const express = require("express");
const db = require("./data/dbConfig");

const router = express.Router();

// CRUD operations here

// get all
router.get("/", async (req, res, next) => {
  try {
    const accounts = await db.select("*").from("accounts");
    res.json(accounts);
  } catch (err) {
    console.log(err);
  } finally {
    next();
  }
});

//new account
router.post("/", async (req, res, next) => {
  const newUser = {
    name: req.body.name,
    budget: req.body.budget
  };

  try {
    const [id] = await db("accounts").insert(newUser);
    const newAccount = await db("accounts")
      .where("id", id)
      .first();
    res.json(newAccount);
  } catch (err) {
    console.log(err);
  } finally {
    next();
  }
});

// get by id
router.get("/:id", async (req, res, next) => {
  try {
    const accounts = await db
      .first("*")
      .from("accounts")
      .where("id", req.params.id);
    res.json(accounts);
  } catch (err) {
    console.log(err);
  } finally {
    next();
  }
});

// update
router.put("/:id", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    };
    await db("accounts")
      .where("id", req.params.id)
      .update(payload);
    const accounts = await db("accounts")
      .where("id", req.params.id)
      .first();
    res.json(accounts);
  } catch (err) {
    console.log(err);
  } finally {
    next();
  }
});

// delete
router.delete("/:id", async (req, res, next) => {
  try {
    await db("accounts")
      .where("id", req.params.id)
      .del();
    res.status(204).end();
  } catch (err) {
    console.log(err);
  } finally {
    next();
  }
});

module.exports = router;
