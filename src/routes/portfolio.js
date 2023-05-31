const express = require("express");
const router = express.Router();
const portfolioController = require("../controller/portfolio");
const { validateSeller } = require("../middleware/common");
const { protect } = require("../middleware/Auth");
const upload = require("../middleware/Multer");

router.get("/", portfolioController.getAllPortfolio);
router.get("/worker/:id", portfolioController.getPortfolioUser);
router.get("/detail/:id", portfolioController.getDetailPortfolio);
router.post("/addportfo/:id", upload, portfolioController.inputPortfolio);
router.delete("/delete/:id", protect, portfolioController.deletePortfolio);
router.put(
  "/update/:id",
  protect,
  validateSeller,
  portfolioController.updatePortfolio
);

module.exports = router;
