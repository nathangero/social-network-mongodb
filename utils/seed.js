const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { usersData, thoughtsData } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtsCheck.length) {
      await connection.dropCollection('thoughts');
    }

    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
      await connection.dropCollection('users');
    }

    await User.collection.insertMany(usersData);
    await Thought.collection.insertMany(thoughtsData);

    console.log("Seeding complete");
    process.exit(0);
})