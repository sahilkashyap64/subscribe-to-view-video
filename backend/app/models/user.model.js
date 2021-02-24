

module.exports = mongoose => {
  var userschema = mongoose.Schema(
    {  username: String,
      email: String,
      password: String,
      subscribed: { type: Boolean, default: false},
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
      ]
    },
    // { timestamps: true }
  );

  userschema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("User", userschema);
  return User;
};
