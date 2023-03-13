import {Schema,model} from 'mongoose'

const UserSchema = new Schema({
        firstName:{
                type:String,
                required:true
        },
        lastName:{
                type:String,
                required:true
        },
        email:{
                type:String,
                require:true
        },
        password: {
                type: String,
                required: true,
        },
        city:{
                type:String,
                require:true
        },
        profilePicture: { type: String },
        mobile: { type: String },
        bio: { type: String },
        isAdmin: { type: Boolean, default: false },
        isVerified: { type: Boolean, default: false },
      },
      { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
    );
    
    UserSchema.virtual("fullName").get(function () {
      return `${this.firstName} ${this.lastName}`;
    });
    
    const User = model("User", UserSchema, "todoAppUsers");
    export default User;
