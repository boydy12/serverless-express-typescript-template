const slsVars = require("./.serverless/output.json");

module.exports = async () => {
  process.env["API_URL"] = slsVars.HttpApiUrl;
  console.log("API url set: ", process.env["API_URL"]);
};
