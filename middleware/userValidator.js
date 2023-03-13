import { body } from 'express-validator';

export const userValidator = [
  body("firstName")
    .notEmpty()
    .withMessage("first name is required.")
    .isAlpha("de-DE", { ignore: " -" })
    .withMessage("First name contains illegal characters ")
    .trim(),
  body("lastName")
    .notEmpty()
    .withMessage("last name is required.")
    .isAlpha("de-DE", { ignore: " -" })
    .withMessage("last name contains illegal characters ")
    .trim(),
  body("email")
    .notEmpty()
    .withMessage("Email must be provided")
    .isEmail()
    .withMessage("Email format is invalid")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password must be specified.")
    .trim()
    .withMessage(
      "Password is not secure. It should contain at least eight characters, including at least one lowercase letter, at least one uppercase letter, at least one number and at least one special character."
    ),

  body("city")
    .notEmpty()
    .withMessage("city is required.")
    .isAlpha("de-DE", { ignore: " -" })
    .withMessage("city contains illegal characters ")
    .trim(),
];
export const setPasswordValidator = [
  body("password").notEmpty().withMessage("Password must be specified.").trim(),

];

export const resetPasswordValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email must be provided")
    .trim()
    .isEmail()
    .withMessage("Email format is invalid")
    .normalizeEmail(),
];

