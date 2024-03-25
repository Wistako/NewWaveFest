const Seat = require('../models/seats.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.getOne = async (req, res, next) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if(!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addNew = async (req, res) => {
  const { day, seat, client, email } = req.body;
  cleanData = sanitize({ day, seat, client, email });
  try {
    const newSeat = new Seat(cleanData);
    const seatAlreadyTaken = await Seat.find({ day, seat });

    if(seatAlreadyTaken.length) 
      return res.status(409).json({ message: 'The slot is already taken...' });

    await newSeat.save();
    const seats = await Seat.find();
    
    req.io.emit('seatsUpdated', seats);
    res.json({ message: 'OK' });
  } catch (err) {
    console.error('An error occurred:', err);
    res.status(500).json({ message: err });
  }
};

exports.changeOne = (async (req, res) => {
  const { day, seat, client, email } = req.body;

  try {
    const seat = await Seat.findById(req.params.id);
    if(seat) {
      await Seat.updateOne({ id: req.params.id }, { $set: { day, seat, client, email } });
      const seats = await Seat.find();
      req.io.emit('seatsUpdated', seats);
      res.json({ message: 'OK', seat });
    }
    else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

exports.delateOne = async (req, res) => {

  try {
    const seat = await Seat.findById(req.params.id);
    if(!seat) res.status(404).json({ message: 'Not found' });
    else {
      await seat.remove();
      const seats = await Seat.find();
      req.io.emit('seatsUpdated', seats);
      res.json({ message: 'OK' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}