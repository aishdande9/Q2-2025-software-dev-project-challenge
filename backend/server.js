const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const uploadRoute = require('./upload'); 

app.use(express.json());
app.use('/', uploadRoute);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
