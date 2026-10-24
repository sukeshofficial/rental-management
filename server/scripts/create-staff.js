import dotenv from "dotenv";
dotenv.config();

import connectDB from "../src/config/db.js";
import User, { USER_ROLES, USER_STATUS } from "../src/models/user.model.js";
import { generateToken } from "../src/services/auth.service.js";

// Helper to upsert a single staff member
const upsertStaff = async ({ name, email, phone, password }) => {
  const normalizedEmail = email.toLowerCase().trim();
  let staff = await User.findOne({ email: normalizedEmail });

  if (staff) {
    staff.name = name;
    staff.phone = phone;
    staff.role = USER_ROLES.INTERNAL_STAFF;
    staff.status = USER_STATUS.ACTIVE;
    staff.password = password; // pre-save hook hashes modified password
    await staff.save();
    console.log(`✅ Updated existing account to internal_staff: ${normalizedEmail}`);
  } else {
    staff = new User({
      name,
      email: normalizedEmail,
      phone,
      password,
      role: USER_ROLES.INTERNAL_STAFF,
      status: USER_STATUS.ACTIVE,
    });
    await staff.save();
    console.log(`🎉 Created new internal_staff account: ${normalizedEmail}`);
  }

  const token = generateToken(staff);
  return { staff, token, password };
};

// Check if CLI arguments were passed: node create-staff.js <email> <password> [name] [phone]
const args = process.argv.slice(2);

let staffList = [];

if (args.length >= 2) {
  // 1. Single custom user passed directly via CLI flags
  const [email, password, name = "Staff Member", phone = "+1 555-0100"] = args;
  staffList = [{ email, password, name, phone }];
} else {
  // 2. Default batch list of multiple staff members across different departments
  staffList = [
    {
      name: "Operations Staff",
      email: "operations.staff@rental.internal",
      phone: "+1 555-8801",
      password: "StaffSecurePassword123!",
    },
    {
      name: "Inventory Manager",
      email: "inventory.staff@rental.internal",
      phone: "+1 555-8802",
      password: "StaffSecurePassword123!",
    },
    {
      name: "Support Staff",
      email: "support.staff@rental.internal",
      phone: "+1 555-8803",
      password: "StaffSecurePassword123!",
    },
  ];
}

try {
  await connectDB();

  console.log("\n========================================================");
  console.log(`PROVISIONING ${staffList.length} STAFF ACCOUNT(S)...`);
  console.log("========================================================\n");

  // Staff accounts are mutually independent (distinct emails), so they can be
  // provisioned concurrently. Promise.all preserves insertion order in results.
  const results = await Promise.all(staffList.map((member) => upsertStaff(member)));

  console.log("\n========================================================");
  console.log("ALL PROVISIONED STAFF ACCOUNTS & TOKENS:");
  console.log("========================================================");
  results.forEach(({ staff, token, password }, index) => {
    console.log(`\n[Staff Member #${index + 1}]`);
    console.log(`Name:     ${staff.name}`);
    console.log(`Email:    ${staff.email}`);
    console.log(`Password: ${password}`);
    console.log(`Role:     ${staff.role}`);
    console.log(`Token:    ${token}`);
  });
  console.log("\n========================================================\n");

  process.exit(0);
} catch (error) {
  console.error("❌ Failed to provision staff:", error);
  process.exit(1);
}
