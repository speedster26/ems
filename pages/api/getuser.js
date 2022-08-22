// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../middleware/mongoose"
import User from "../../models/User";
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      if (req.body.token) {
        var t = jwt.verify(req.body.token, process.env.JWT_SECRET)
        let user = await User.findOne({ email: t.email })
        res.status(200).send({ success: true, user })
      }
    }
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
  // Update order status in db

  // Update status into orders tables
}
export default connectDb(handler)
