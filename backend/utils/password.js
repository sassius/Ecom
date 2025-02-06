import bcrypt from "bcrypt";

export async function passwordHashing(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function checkPassword(password, dbPassword) {
  return await bcrypt.compare(password, dbPassword);
}
