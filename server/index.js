const express = require("express");
const cors = require("cors");
const app = express();
const database = require("./config/database")
const authRouter = require("./routes/auth");
const bodyParser = require("body-parser");
const feedbackRoutes = require("./routes/feedback");
const cookieParser = require("cookie-parser");
const { getFeedbackSummary } = require("./controller/Feedback");
dotenv.config();
database.connectDb();

app.use(express.json());
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

app.use("/api/auth/" , authRouter);
app.use("/api/feedback/" , feedbackRoutes);





app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
