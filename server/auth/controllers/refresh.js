const { refreshTokens } = require('../../jwt');

const refresh = async (req, res) => {
  try {
    const accessToken = await refreshTokens(req, res);
    res.json({ accessToken });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = refresh;
