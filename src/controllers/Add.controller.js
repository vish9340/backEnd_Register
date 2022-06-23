const express = require("express");
const Add = require("../models/Add.model");

const app = express.Router();

app.get("/:id", async (req, res) => {
  try {
    const add = await Add.findById(req.params.id);
    return res.status(200).send(add);
  } catch (error) {
    return res.status(500).send({ msg: error.msg });
  }
});

/////////////////////////learn and remember///////////

app.get("", async (req, res) => {
  try {
    const page = req.query.page;
    const pagesize = req.query.pagesize;

    const skip = (page - 1) * pagesize;
    const add = await Add.find().skip(skip).limit(pagesize).lean().exec();

    const totalData = await Add.find().countDocuments();
    const totalPages = Math.ceil((await Add.find().countDocuments())/pagesize);
    return res.status(200).send({add, totalPages,totalData});
  } catch (error) {
    return res.status(500).send({msg: error.msg});
  }
});

/////////////////////////

app.post("", async (req, res) => {
  try {
    // console.log(req.user.mobile);
    const add = await Add.create(req.body);
    return res.status(200).send(add);
  } catch (error) {
    return res.status(200).send({ msg: error.msg });
  }
});

app.patch("/:id", async (req, res) => {
  try {
    const add = await Add.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(200).send(add);
  } catch (error) {
    return res.status(500).send({ msg: error.msg });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const add = await Add.findByIdAndDelete(req.params.id);
    return res.status(200).send(add);
  } catch (error) {
    return res.status(500).send({ msg: error.msg });
  }
});

module.exports = app;
