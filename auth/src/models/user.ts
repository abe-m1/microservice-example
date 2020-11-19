import mongoose from 'mongoose';
import { Password } from '../services/password';

// an interface that describes the properties
// that are required to create a new User

interface UserAttrs {
  email: string;
  password: string;
}

// interface that describes the properties that a user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//middleware function
userSchema.pre('save', async function (done) {
  //use regular function, becasue we need 'this'
  //to reference the record
  if (this.isModified('password')) {
    // only want to hash if password has been changed
    // if change on email only we want to bypass
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  // we need to call done when we finish
  done();
});

//in order to do effective typechecking we will need to run this function
//everytime we create a new user

//custom function
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
//above can thing about < > as arguments to model
// these are types provided to a function as arguments
//whenever you call model you are going to return a type of UserModel

export { User };
