import mongoose from "mongoose";

const DonorSchema = new mongoose.Schema({
    name: { type: String },
    organisationName: { type: String, },
    contactNumber : { type: String,  },
    address: { type: String, },
    email: { type: String },
    panNumber: { type: String },
    gstNumber: { type: String },
    modeofDonation: { type: String },
    donationAmount: { type: String },
    donationFrequency: { type: String },
    consentForUpdate:{type:String},
    uploadPaymentProof : { type: String },
  
});

// DonorSchema.pre('save', async function(next) {
//     if (!this.beneficiaryId) {
//         const count = await mongoose.model('Beneficiary').countDocuments();
//         this.beneficiaryId = `BEN${String(count + 1).padStart(4, '0')}`;
//     }
//     next();
// });
const DonationReg = mongoose.model("Donor", DonorSchema);

export default DonationReg;
