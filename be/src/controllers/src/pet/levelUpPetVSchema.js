const Joi = require("joi");

// Định nghĩa schema cho params
const levelUpPetSchemaParams = Joi.object({
  petId: Joi.string()
    .length(24) // Kiểm tra chuỗi có độ dài chính xác 24 ký tự
    .hex() // Kiểm tra xem chuỗi chỉ chứa ký tự hexadecimal
    .required()
    .messages({
      "string.base": `"petId" phải là một chuỗi ký tự.`,
      "string.empty": `"petId" không được để trống.`,
      "string.length": `"petId" phải có đúng 24 ký tự.`,
      "string.hex": `"petId" không đúng định dạng ObjectId hợp lệ.`,
      "any.required": `"petId" là trường bắt buộc.`,
    }),
});

// Định nghĩa schema cho body (không thay đổi)
const levelUpPetSchemaBody = Joi.object({
  confirm: Joi.boolean().optional().messages({
    "boolean.base": `"confirm" phải là giá trị true hoặc false.`,
  }),
});

module.exports = {
  levelUpPetSchemaParams,
  levelUpPetSchemaBody,
};
