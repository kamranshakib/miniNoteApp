import expres, { json } from "express";
import Note from "../models/tourModel.js";
import { Query } from "mongoose";

export const getAllNote = async (req, res) => {
  try {
    // BUILD THE QUERY
    // 1) Filltaring
    const queryObg = {...req.query};
    const excludeQuery = ['sort', 'page', 'limit']
    excludeQuery.forEach(el => delete queryObg[el])

    // 2) Filltaring
    let queryStr = JSON.stringify(queryObg)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)   

    let query =  Note.find(JSON.parse(queryStr));
    // SORTING BY QYERY
    if(req.query.sort){
      const sortby = req.query.sort.split(',').join(' ')
      query.sort(sortby)
    }
    else{
      query = query.sort('-_id')
    }

    // EXECUTE THE QUERY 
    const note = await query;
    // SEND RESPONSE
    res
      .status(201)
      .json({
        status: "Success",
        msg: "here is your note ..",
        length: note.length,
        data: { note },
      });
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

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    res
      .status(201)
      .json({
        status: "Success",
        msg: `deletd the note of this id : ${req.params.id}`,
      });
  } catch (err) {
    res.status(500),
      json({
        status: "field",
        msg: "something went wrong while deleting the note.",
      });
  }
};
