const authRepository = require("../repositories/auth.repository");

exports.getAuthUrl = async () => {
  try {
    const authUrl = await authRepository.getAuthUrl();
    return authUrl;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get auth URL");
  }
};

exports.oauth2callback = async (code: any) => {
  try {
    const tokens = await authRepository.oauth2callback(code);
    return tokens;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get tokens");
  }
};
