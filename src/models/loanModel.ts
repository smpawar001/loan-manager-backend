import { LoanTypes } from '../interfaces/modelInterfaces';
import mongoose from 'mongoose';

interface LoanInfo {
  name: string;
  interestRate: number;
  type: LoanTypes;
}

interface LoanDoc extends mongoose.Document<LoanInfo> {
  name: string;
  interestRate: number;
  type: LoanTypes;
}

interface LoanModel extends mongoose.Model<LoanDoc> {
  build: (attr: LoanInfo) => LoanDoc;
}

const loanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    interestRate: { type: Number },
    type: { type: String },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    timestamps: true,
  }
);

loanSchema.statics.build = (attr: LoanInfo) => {
  return new Loan(attr);
};

const Loan = mongoose.model<LoanDoc, LoanModel>('Loan', loanSchema);

export default Loan;
