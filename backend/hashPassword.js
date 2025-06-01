const bcrypt = require('bcrypt');

(async () => {
  const password = 'admin123'; // replace with your desired password
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  console.log('Hashed password:', hash);
})();
