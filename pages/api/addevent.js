// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Event from "../../models/Event"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {

    try {
        if (req.method == 'POST') {
            const eId = Math.floor(Math.random()*Date.now())
            let p = new Event({
                eventId: eId,
                event_name: req.body.name,
                start_time: req.body.stime,
                end_time: req.body.etime,
                event_desc: req.body.desc,
                location: req.body.location,
                image: req.body.img,
                capacity: req.body.capacity
            })
            await p.save();
            res.status(200).json({ success: true })
        }
        else {
            res.status(400).json({ success: false, error: "This method is not allowed" })
        }
    } catch (error) {
        res.status(500).json({ success: false, error })
    }
}
export default connectDb(handler)