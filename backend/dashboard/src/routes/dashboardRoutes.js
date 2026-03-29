const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const authenticateToken = require("../middlewares/authMiddleware");

<<<<<<< HEAD
// /api/me
router.get("/me", authenticateToken, dashboardController.getMe);

// /api/settings
router.get("/settings", authenticateToken, dashboardController.getSettings);
router.put("/settings", authenticateToken, dashboardController.updateSettings);
=======
/**
 * DASHBOARD & USER MANAGEMENT ROUTES
 * All routes here require a valid 'Authorization: Bearer <token>' header.
 */

// Profile & Identity: Fetch current user data (used to populate context in Next.js)
router.get("/me", authenticateToken, dashboardController.getMe);

// Account Settings: Profile info, company details, and notification preferences
router.get("/settings", authenticateToken, dashboardController.getSettings);
router.put("/settings", authenticateToken, dashboardController.updateSettings);

// Security Settings: Change account password
>>>>>>> upstream/main
router.put(
  "/settings/password",
  authenticateToken,
  dashboardController.changePassword,
);

<<<<<<< HEAD
// /api/dashboard/users
router.get("/dashboard/users", authenticateToken, dashboardController.getUsers);
=======
/**
 * MEMBER MANAGEMENT (Multi-Tenancy)
 * These routes are scoped to organization members. 
 * Controllers ensure users only see colleagues from their own companyId.
 */

// List team members (Admins/Interviewers)
router.get("/dashboard/users", authenticateToken, dashboardController.getUsers);

// Invite a new member via email
>>>>>>> upstream/main
router.post(
  "/dashboard/users/add-user",
  authenticateToken,
  dashboardController.addUser,
);
<<<<<<< HEAD
=======

// Update member role or status (isMainAdmin restricted for other Admin accounts)
>>>>>>> upstream/main
router.put(
  "/dashboard/users/:id",
  authenticateToken,
  dashboardController.updateUser,
);
<<<<<<< HEAD
=======

// Revoke access / Remove user from the organization
>>>>>>> upstream/main
router.delete(
  "/dashboard/users/:id",
  authenticateToken,
  dashboardController.deleteUser,
);

module.exports = router;
