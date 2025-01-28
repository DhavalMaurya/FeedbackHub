const User = require("../models/User")
const Feedbacks = require("../models/Feedbacks")

exports.submitFeedback = async (req, res) => {
    const { category, priority, rating, description, feedbackType } = req.body;
    const clientId = req.user.id
    try {
        //validate form fields
        if (!category || !priority || !rating || !description || !feedbackType) {
            return res.status(403).json({ success: false, message: "All fields require" });
        }

        //create new feedback
        const submittedFeedback = await Feedbacks.create({
            client: clientId,
            category,
            priority,
            rating,
            description,
            feedbackType,
        })

        //add feedback in client db
        const updatedClient = await User.findByIdAndUpdate(clientId, {
            $push: {
                feedbacks: submittedFeedback._id
            }
        }, { new: true })

        return res.status(200).json({ success: true, message: "Your feedback has been submited", data: submittedFeedback })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: "Error while Submiting feedback", error });
    }
}

exports.getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedbacks.find().populate("client")
        return res.status(200).json({ success: true, message: "All feedbacks fetched", data: feedbacks });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Error while fetching all feedbacks", error });
    }
}

exports.getFeedbackSummary = async (req, res) => {
    try {
        const totalFeedbacks = await Feedbacks.aggregate([
            {
                $group: {
                    _id: null,
                    totalFeedbacks: { $sum: 1 },
                }
            }
        ])

        const feedbacksByRating = await Feedbacks.aggregate([{
            $group: {
                _id: "$feedbackType",
                totalFeedbacks: { $sum: 1 }
            },
        },
        {
            $sort: {
                totalFeedbacks: -1
            }
        },
        ])

        const feedbackByTime = await Feedbacks.aggregate([
            {
                $addFields: {
                    formattedDate: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    }
                }
            },
            {
                // Group by the formatted date
                $group: {
                    _id: "$formattedDate", // Group by day (YYYY-MM-DD)
                    count: { $sum: 1 },    // Count the number of feedbacks
                    feedbacks: { $push: "$$ROOT" } // Include all feedbacks for the day (optional)
                }
            },
            {
                // Sort by the date (optional)
                $sort: { _id: 1 }
            }
        ])
        return res.status(200).json({ success: true, message: "Feedback summary fetched", totalFeedbacks: totalFeedbacks[0].totalFeedbacks, feedbackByTime, feedbacksByRating })

    } catch (error) {
        console.log(err)
        return res.status(500).json({ success: false, message: "Error while fetching feedback Summary ", error });
    }
}

