const express = require('express');
const app = express();
const uploadRoute = require('./upload');

app.use(express.json());
app.use('/', uploadRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
 