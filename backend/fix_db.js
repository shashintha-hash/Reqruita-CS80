const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/reqruita';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to DB');
    
    // 1. Mark all existing users as verified if they are not
    // 2. Set all existing users to 'active' status if they don't have it
    // 3. Ensure all users have a firstName/lastName if missing (legacy data)
    
    const users = await mongoose.connection.db.collection('users').find({}).toArray();
    console.log(`Found ${users.length} users. Checking and fixing data...`);
    
    for (let user of users) {
      let updates = {};
      
      if (user.isEmailVerified === undefined || user.isEmailVerified === false) {
        updates.isEmailVerified = true;
      }
      
      if (!user.status) {
        updates.status = 'active';
      }
      
      if (!user.firstName) {
        const roleName = user.role ? (user.role.charAt(0).toUpperCase() + user.role.slice(1)) : 'User';
        updates.firstName = roleName;
      }
      
      if (!user.lastName) {
        updates.lastName = 'Member';
      }

      if (Object.keys(updates).length > 0) {
        await mongoose.connection.db.collection('users').updateOne(
          { _id: user._id },
          { $set: updates }
        );
        console.log(`Updated user ${user.email || user._id}:`, updates);
      }
    }

    console.log('Database fix complete!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Connection error:', err);
    process.exit(1);
  });
