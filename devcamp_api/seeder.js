import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Color from 'colors';
import { BootcampModel } from './models/bootcamp.js';

// Load env vars
dotenv.config('./config/config.env');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync('./_data/bootcamps.json', 'utf-8')
);

// Import data
const importData = async () => {
  try {
    await BootcampModel.create(bootcamps);

    console.log('Bootcamps imported...'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await BootcampModel.deleteMany();

    console.log('Bootcamps deleted...'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
