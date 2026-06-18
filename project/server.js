const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/restaurants", require("./routes/restaurantRoutes"));
app.use("/api/ngos", require("./routes/ngoRoutes"));
app.use("/api/volunteers", require("./routes/volunteerRoutes"));
app.use("/api/categories", require("./routes/foodCategoryRoutes"));
app.use("/api/donations", require("./routes/foodDonationRoutes"));
app.use("/api/requests", require("./routes/donationRequestRoutes"));
app.use("/api/deliveries", require("./routes/deliveryStatusRoutes"));

app.get("/", (req, res) => {
  res.send("FoodRescue Hub Backend API is running");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use. Stop the other server or change PORT in .env.`);
        process.exit(1);
      }

      console.error("Server error:", error.message);
      process.exit(1);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

startServer();
