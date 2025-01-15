const Joi = require("joi");

// Định nghĩa schema
const getBalanceFromNodeSchema = Joi.object({
  walletAddress: Joi.string()
    .pattern(/^celestia1[a-z0-9]{38}$/) // Định dạng địa chỉ ví Keplr của Celestia
    .required()
    .messages({
      "string.base": `"walletAddress" phải là một chuỗi ký tự.`,
      "string.pattern.base": `"walletAddress" không đúng định dạng ví Keplr hợp lệ (bắt đầu bằng 'celestia1' và dài 38 ký tự).`,
      "any.required": `"walletAddress" là trường bắt buộc.`,
    }),
});

module.exports = getBalanceFromNodeSchema;