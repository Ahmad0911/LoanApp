import mongoose, { Schema, Document } from "mongoose";

export interface ILoan extends Document {
  fullName: string;
  email: string;
  phone: string;
  dob: Date;
  houseAddress: string;
  workAddress: string;
  idFront: string;
  idBack: string;
  ssnFront: string;
  ssnBack: string;
  loanAmount: number;
  loanType: string;
  loanDuration: number;
  status: string;
  createdAt: Date;
}

const loanSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dob: { type: Date, required: true },
  houseAddress: { type: String, required: true },
  workAddress: { type: String, required: true },
  idFront: { type: String, required: true },
  idBack: { type: String, required: true },
  ssnFront: { type: String, required: true },
  ssnBack: { type: String, required: false },
  loanAmount: { type: Number, required: true },
  loanType: { type: String, required: true },
  loanDuration: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["pending", "approved", "rejected"], 
    default: "pending" 
  },
  createdAt: { type: Date, default: Date.now },
});

const Loan = mongoose.model<ILoan>("Loan", loanSchema);
export default Loan;