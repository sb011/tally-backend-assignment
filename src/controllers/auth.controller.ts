const authService = require("../services/auth.service");

exports.getAuthUrl = async (req: any, res: any) => {
  try {
    const authUrl = await authService.getAuthUrl();
    res.status(200).json(authUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.oauth2callback = async (req: any, res: any) => {
  try {
    const code = req.query.code as string;
    const tokens = await authService.oauth2callback(code);
    res.set;
    res.status(200).json(tokens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
