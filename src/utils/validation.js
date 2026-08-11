const validator = require("validator");

const validateSignData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName && !lastName) {
    throw new Error("First name and last name are required");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email address");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Invalid password");
  }
};

const validateEditProfileData = (body) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "password",
    "photoUrl",
    "phoneNumber",
    "age",
    "gender",
    "about",
    "skills",
  ];

  return Object.keys(body).every((field) => allowedEditFields.includes(field));
};
module.exports = { validateSignData, validateEditProfileData };
