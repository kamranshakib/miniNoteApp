import expres from "express";
import Note from "../models/tourModel.js";

export const getAllNote = async (req, res) => {
  try {
    const note = await Note.find();
    res
      .status(201)
      .json({ status: "Success", msg: "here is your note ..", data: { note } });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      msg: "Something went wrong while retrieving the notes. ",
    });
  }
};

export const createNote = async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res
      .status(201)
      .json({ status: "Success", msg: " the note is saved.", data: { note } });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      msg: "Something went wrong while saving the note. ",
    });
  }
};

export const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!note)
      res
        .status(500)
        .json({ status: "field", msg: "Opps somtthing went wrong.." });

    res.status(201).json({ status: "Success", data: { note } });
  } catch (err) {
    res.status(500),
      json({
        status: "field",
        msg: "something went wrong while updating the note.",
      });
  }
};

export const deleteNote = async(req,res)=>{
  try{
   const note =  await Note.findByIdAndDelete(req.params.id)
    res.status(201).json({status:"Success", msg : `deletd the note of this id : ${req.params.id}` })

  }
  catch(err){
    res.status(500),
    json({
      status: "field",
      msg: "something went wrong while deleting the note.",
    });
  }
}
