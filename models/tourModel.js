import mongoose from "mongoose";
mongoose
  .connect("mongodb://localhost:27017/Note")
  .then(() => {
    console.log("connectd to database ...");
  })
  .catch((err) => {
    console.log("Error: disconnected to database ...");
  });

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const noteModel = mongoose.model("Notes", noteSchema);
export default noteModel;
