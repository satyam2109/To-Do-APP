const mongoose = require("mongoose");
const Counter = require('./Counter');

const todoSchema = new mongoose.Schema(
  {
    todoId: {
      type: Number,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: Boolean,
      default: false,
    },
    targetDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

todoSchema.pre('save', async function (next) {
    if(this.isNew) {
        const counter = await Counter.findOneAndUpdate(
            { name: 'todoId'},
            { $inc: { value: 1} },
            {new: true, upsert: true}
        );

        this.todoId = counter.value;
    }
    (next);
})

module.exports = mongoose.model("Todo", todoSchema);