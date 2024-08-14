let output;

const execute = async (inputData) => {
  const domain = inputData.domain;
  const country_code = inputData.country_code;
  const SEMRUSH_API_KEY = "ca84468a054b06b7208f89ee0d68576d";

  const response = await fetch(
    `https://api.semrush.com/?type=domain_ranks&key=${SEMRUSH_API_KEY}&domain=${domain}&database=${country_code}`
  ).then((response) => response.text());

  const keys = response
    .split("\n")[0]
    .split(";")
    .map((key) => key.trim())
    .filter((key) => key);

  const jsonResp = response
    .split("\n")
    .splice(1)
    .map((line) => line.trim())
    .filter((line) => line)
    .map((line) => {
      const values = line.split(";");
      return keys.reduce((obj, key, index) => {
        obj[key] = values[index];
        return obj;
      }, {});
    });

  console.log("response >>", jsonResp);

  output = {
    traffic: jsonResp[0]["Organic Traffic"],
  };

  console.log("output >>", output);
};

execute({
  domain: "kitchentime.se",
  country_code: "se",
});
