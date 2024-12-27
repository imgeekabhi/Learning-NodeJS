const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = require('./app');

dotenv.config({ path: './config.env' });
const db = process.env.DATABASE;

// Connect to the database
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful');

    // Schema and Model setup
    const tourSchema = new mongoose.Schema({
      name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
      },
      raiting: {
        type: Number,
        required: [true, 'A tour must have a raiting'],
        default: 4.5,
      },
      price: {
        type: Number,
        required: [true, 'A tour must have a Price'],
      },
    });

    const Tour = mongoose.model('Tour', tourSchema);

    // Create a new document
    const testTour = new Tour({
      name: 'Punjab Trip',
      raiting: 4.5,
      price: 21999,
    });

    // Save the document to the database
    testTour
      .save()
      .then((doc) => {
        console.log('Document saved:', doc);
      })
      .catch((err) => {
        console.log('Error saving document:', err);
      });
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on the post ${port}...`);
});
