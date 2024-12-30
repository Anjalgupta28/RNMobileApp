const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/register', (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      phoneNumber,
      meterNumber,
      addressOfMeter,
      password,
    } = req.body;

    // Check if required fields are present
    const missingFields = [];
    if (!email) missingFields.push('email');
    if (!firstName) missingFields.push('firstName');
    if (!lastName) missingFields.push('lastName');
    if (!phoneNumber) missingFields.push('phoneNumber');
    if (!meterNumber) missingFields.push('meterNumber');
    if (!addressOfMeter) missingFields.push('addressOfMeter');
    if (!password) missingFields.push('password');

    if (missingFields.length > 0) {
      return res.status(400).json({ error: `The following fields are required: ${missingFields.join(', ')}` });
    }

    // For simplicity, you can log the data to the console
    console.log({
      email,
      firstName,
      lastName,
      phoneNumber,
      meterNumber,
      addressOfMeter,
      password,
    });

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error registering user: ', error);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
