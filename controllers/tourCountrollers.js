const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

exports.checkId = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }
  next();
};
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'Fail',
      message: 'Missing name or price!',
    });
  }
  next();
};

exports.getTours = (req, res) => {
  res.status(200).json({
    status: 'Success',
    statusCode: '200',
    requestTime: req.requestTime,
    results: tours.length,
    data: { tours: tours },
  });
};
exports.getTour = (req, res) => {
  const tourId = Number(req.params.id);
  const tour = tours.find((el) => el.id === tourId);
  if (!tour) {
    res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'Success',
    statusCode: '200',
    data: { tour },
  });
};
exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
};
exports.updateTour = (req, res) => {
  const tourId = Number(req.params.id);
  const tour = tours.find((el) => el.id === tourId);
  const updatedTourBody = req.body;
  if (!tour) {
    res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }
  const updatedTour = { ...tour, ...updatedTourBody };
  const updatedTours = tours.map((obj) =>
    obj.id === updatedTour.id ? { ...obj, ...updatedTour } : obj,
  );
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTours),
    (err) => {
      res.status(200).json({
        status: 'success',
        message: 'Tour updated!',
        data: {
          tour: updatedTour,
        },
      });
    },
  );
};

exports.deleteTour = (req, res) => {
  const tourId = Number(req.params.id);
  if (tourId > tours.length) {
    res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }
  const updatedTours = tours.filter((obj) => obj.id !== tourId);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTours),
    (err) => {
      res.status(200).json({
        status: 'success',
        message: 'Tour deleted successfully!',
      });
    },
  );
};
