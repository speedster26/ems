import mongoose, { models } from 'mongoose';
const { Schema , model } = mongoose;

const EventSchema = new Schema({
  eventId: {type: String, required:true, unique:true},
  event_name: {type: String, required:true},
  start_time: {type: Date, required:true},
  end_time: {type: Date, required:true},
  event_desc: {type: String, required:true},
  location: {type: Object, required:true},
  image: {type: String},
  capacity: {type: Number, required:true}
},{timestamps:true});

export default models.Event || model("Event", EventSchema);