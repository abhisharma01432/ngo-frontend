import express from "express";
import { requireAuth } from "../../middleware/auth.js";
import DonationReg from "../../model/donor_reg/donor_reg.js";

const donorRouter = express.Router();

donorRouter.post("/regesterDonor", async (req, res) => {
  // console.log("hhhhh")
    const newdata=req.body;
    console.log("reggg",newdata)
    const data = await DonationReg.create(
    newdata
    )
      return res.json({
                success: true,
                message: ` donation recorded successfully`,
                data:data    
            });
});
// Donor profile
donorRouter.get("/profile", (req, res) => {
  res.json({ message: "Donor profile endpoint" });
});

// Update donor profile
donorRouter.put("/profile", requireAuth, (req, res) => {
  res.json({ message: "Update donor profile endpoint" });
});

// Donor's donations
donorRouter.get("/donations", requireAuth, (req, res) => {
  res.json({ message: "Donor donations endpoint" });
});

// Donor dashboard
donorRouter.get("/dashboard", (req, res) => {
  res.json({ message: "Donor dashboard endpoint" });
});

export default donorRouter;