const express = require('express');
const app = express();
const cors = require('cors');
const analyticsRoutes = require("./routes/analytics");
const uploadRoutes = require("./upload");
app.use(cors());
app.use(express.json());
app.use("/api/upload", uploadRoutes);
app.use("/api/analytics", analyticsRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
