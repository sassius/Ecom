const zod = require("zod");

const signupValidator = zod.object({
  fullname: zod.string().min(1, "fullname is required"),
  email: zod.string().email().min("Email is required"),
  password: zod.string().min(8, "Password should be atleast 8 character long"),
});

const signinValidator = zod.object({
  email: zod.string().email().min("Email is required"),
  password: zod.string().min(8, "Password should be atleast 8 character long"),
});

module.exports = {
  signinValidator,
  signupValidator,
};
