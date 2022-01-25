const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  email: {
    type: 'string',
    lowercase: true,
    unique: true,
    required: [true, "Can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true
  },
  password: {
    type: 'string',
    required: [true, "Can't be blank"]
  },
  tokens: [],
  articles: [{type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost'}]
});

UserSchema.pre('save', function(next){
  const user = this;
  if(!user.isModified('password')) return next();
  // jesli uzytkownik jest tworzony lub modyfikowany
    bcrypt.genSalt(10, function(err, salt){
      if(err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash){
        if(err) return next(err);

        user.password = hash;
        next();
      })
    })
})

UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({_id: user._id.toString()}, 'appSecret');
  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
}

UserSchema.statics.findByCredentials = async function(email, password) {
  const user = await User.findOne({email});
  if(!user) throw new Error('invalid email or password');
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) throw new Error('invalid email or password');
  // jesli wszystko sie zgadza
  return user;
}
const User = mongoose.model('User', UserSchema);

module.exports = User;
