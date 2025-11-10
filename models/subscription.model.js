import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    // subscription name
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      minLength: 2,
      maxLength: 100,
      trim: true,
    },
    // Price
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be greater than 0"],
    },
    // currency
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "INR"],
      default: "USD",
    },
    // frequency
    frequency: {
      type: String,
      enum: ["daily ", "weekly", "monthly", "yearly"],
    },
    // category
    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "entertainment",
        "politics",
        "lifestyle",
        "technology",
        "finance",
        "other",
      ],
      required: true,
    },
    // payment
    payment: {
      type: String,
      required: true,
      trim: true,
    },
    // status
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    // startDate
    startDate: {
      type: Date,
      required: true,
      validate: {
        validate: (value) => value <= new Date(),
        message: "Start Date must be in the past",
      },
    },
    //Renewal
    renewalDate: {
      type: Date,
      // required: true,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal  Date must be in the after start Date",
      },
      // [user] Ref-model
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },
    },

    //tims-stamps
  },
  { timestamps: true }
);


// runn  this [MIDDLE-WARE]function bfore save
// Autocalculates the renewal date if Missing

subscriptionSchema.pre("save", (next) => {
  if (!this.renewalDate) {
  //  
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };


    // get the renewal Date
    this.renewalDate = new Date(this.renewalDate)
    // generate Renewal date
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency])
  }


  // check if expired
  if(this.renewalDate < new Date()){
    this.status = 'expired'
  }

  next()
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
