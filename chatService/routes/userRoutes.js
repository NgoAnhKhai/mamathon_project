const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Tạo user mới
router.post("/create", async (req, res) => {
  const { Name, WalletAddress, TotalPets, LevelHouse, Balance } = req.body;

  if (!WalletAddress) {
    return res.status(400).json({ error: "WalletAddress là bắt buộc!" });
  }

  try {
    const user = new User({
      Name: Name || "Unknown",
      WalletAddress,
      TotalPets: TotalPets || [],
      LevelHouse: LevelHouse || 1,
      Balance: Balance || 0,
    });

    await user.save();
    res.status(200).json({ message: "User blockchain đã được tạo thành công!", user });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "WalletAddress đã tồn tại!" });
    }
    res.status(500).json({ error: "Có lỗi xảy ra khi tạo user." });
  }
});

// Lấy danh sách user
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Có lỗi xảy ra khi lấy danh sách user." });
  }
});

// Lấy thông tin user theo WalletAddress
router.get("/:wallet", async (req, res) => {
  const { wallet } = req.params;
  try {
    const user = await User.findOne({ WalletAddress: wallet });
    if (!user) {
      return res.status(404).json({ error: "Không tìm thấy user với địa chỉ ví này." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Có lỗi xảy ra khi lấy thông tin user." });
  }
});

// Cập nhật thông tin user
router.put("/update/:wallet", async (req, res) => {
  const { wallet } = req.params;
  const updates = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { WalletAddress: wallet },
      { ...updates, last_login: Date.now() },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "Không tìm thấy user để cập nhật." });
    }
    res.status(200).json({ message: "Cập nhật user thành công!", user });
  } catch (error) {
    res.status(500).json({ error: "Có lỗi xảy ra khi cập nhật thông tin user." });
  }
});

module.exports = router;
