const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://127.0.0.1:27017')
    .then((client) => {
    db = client.db('proj2024MongoDB')
    coll = db.collection('lecturers')
    })
    .catch((error) => {
    console.log(error.message)
})

// Function to get all lecturers, sorted by name
const getLecturers = async () => {
    try {
      const lecturers = await coll.find().toArray(); // Fetch all lecturers
      return lecturers.sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by lecturer name
    } catch (error) {
      console.error('Error fetching lecturers:', error);
      return [];
    }
};

// Function to delete a lecturer by ID
const deleteLecturerById = async (lecturerId) => {
    try {
      const result = await coll.deleteOne({ _id: lecturerId });
      return result.deletedCount > 0; // Return true if a lecturer was deleted
    } catch (error) {
      console.error('Error deleting lecturer:', error);
      return false;
    }
};

module.exports = { getLecturers, deleteLecturerById };