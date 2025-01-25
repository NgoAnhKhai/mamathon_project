const Pet = require("../../models/pet");
const { AppError, sendResponse } = require("../../helpers/utils");
const levelUpPet = async (req, res, next) => {
  try {
    const { petId, activityType } = req.body;
    
    const pet = await Pet.findById(petId);
    // Kiểm tra petId có hợp lệ không
    // if (!mongoose.Types.ObjectId.isValid(petId)) {
    //   throw new AppError(400, `"petId" không đúng định dạng ObjectId hợp lệ.`, "Validation Error");
    // }

    // Bản đồ EXP nhận được theo từng loại hoạt động
    const activityExpMap = {
      eat: 5,
      sleep: 10,
      play: 15,
    };

    if (!activityExpMap[activityType]) {
      throw new AppError(400, "Loại hoạt động không hợp lệ", "Activity Error");
    }

    if (!pet) {
      throw new AppError(404, "Không tìm thấy Pet", "Activity Error");
    }

    // Logic tăng EXP và thăng cấp
    const expGain = activityExpMap[activityType];
    pet.Exp += expGain;

    const calculateRequiredExp = (level) => Math.floor(10 * Math.pow(level, 2));

    while (true) {
      const requiredExp = calculateRequiredExp(pet.Level);
      if (pet.Exp >= requiredExp) {
        pet.Level += 1;
        pet.Exp -= requiredExp;
        pet.Ability = `Level ${pet.Level} Ability`;
        pet.value = parseFloat((pet.value * 1.5).toFixed(2));
      } else {
        break;
      }
    }

    await pet.save();

    sendResponse(
      res,
      200,
      true,
      pet,
      null,
      `Pet đã thực hiện hoạt động ${activityType}, nhận ${expGain} EXP. Hiện tại Level: ${pet.Level}, EXP: ${pet.Exp}`
    );
  } catch (error) {
    next(error);
  }
};

module.exports = levelUpPet;
