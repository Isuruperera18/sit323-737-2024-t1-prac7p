const Record = require('../models/record.model');

// CREATE a record
const createRecord = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newRecord = new Record({ name, description });
    await newRecord.save();
    res.status(201).json({ message: 'Record created successfully', record: newRecord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating record', error });
  }
};

// GET all records
const getRecords = async (req, res) => {
  try {
    const records = await Record.find();
    res.status(200).json({ records });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving records', error });
  }
};

// GET a single record by ID
const getRecordById = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.status(200).json({ record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving record', error });
  }
};

const updateRecord = async (req, res) => {
  try {
    const { name, description } = req.body;
    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );
    if (!updatedRecord) return res.status(404).json({ message: 'Record not found' });
    res.status(200).json({ message: 'Record updated successfully', record: updatedRecord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating record', error });
  }
};

const deleteRecord = async (req, res) => {
  try {
    const deletedRecord = await Record.findByIdAndDelete(req.params.id);
    if (!deletedRecord) return res.status(404).json({ message: 'Record not found' });
    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting record', error });
  }
};

module.exports = {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
};
