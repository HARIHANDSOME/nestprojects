import * as bcrypt from 'bcrypt'; // must import this

export class RegisterBcrypt {
  /// hasing the password
  async hashpassword(password: string) {
    const passwordsalt = await bcrypt.genSalt(5); // generating salt
    const hash = bcrypt.hash(password, passwordsalt); // hashing

    return hash;
  }

  // hasing the email
  async hashemail(email: string) {
    const emailsalt = await bcrypt.genSalt(5); // generating salt
    const hash = bcrypt.hash(email, emailsalt); // hashing

    return hash;
  }

  // comparing the passwords  (comparing giving password in postman and hashpassword stored in db)

  async compare(password: string, hash: string) {
    // hash - the name in db

    return await bcrypt.compare(password, hash);
  }
}
