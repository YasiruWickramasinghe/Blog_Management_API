const express = require('express');
// const dotenv = require('dotenv');
// const db = require('./config/db');

// ... import other route files as needed
const userRoutes = require('./routes/blogRoutes');


// dotenv.config();
// db.connect();

const app = express();

app.use(express.json());

// ... use other routes as needed
app.use('/users', userRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
