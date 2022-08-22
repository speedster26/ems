// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Event from "../../models/Event"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {

    try {
        if (req.method == 'DELETE') {
            console.log("done");
            const event = await Event.findOne({eventId: req.body.eventId})

            if(event){
                await Event.findOneAndDelete({eventId: req.body.eventId})
                res.status(200).json({ success: true })
            }
        else {
            res.status(400).json({ success: false, error: "This method is not allowed" })
        }
    }
    } catch (error) {
        res.status(500).json({ success: false, error })
    }
}
export default connectDb(handler)