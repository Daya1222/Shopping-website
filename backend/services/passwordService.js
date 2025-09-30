import bcrypt from "bcrypt";
const saltRounds = 10;

async function hashPassword(password) {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

async function comparePassword(password, hash) {
  const match = await bcrypt.compare(password, hash);
  return match;
}

export { hashPassword, comparePassword };
