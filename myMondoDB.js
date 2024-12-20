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
