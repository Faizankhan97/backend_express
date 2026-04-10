const validator = require("validator");

const validateSignData = (req) => {
  const { firstname, lastName, emailId, password } = req.body;

  if (!firstname && !lastName) {
    throw new Error("First name and last name are required");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email address");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Invalid password");
  }
};

module.exports = { validateSignData };
