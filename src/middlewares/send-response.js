module.exports = (req, res, next) => {
    let { apiData, apiStatus, apiError } = req;
    res.json({ apiData, apiError, apiStatus });
};