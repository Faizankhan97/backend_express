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

const validateEditProfileData = (req) => {
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

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field),
  );

  return isEditAllowed;
};
module.exports = { validateSignData, validateEditProfileData };
