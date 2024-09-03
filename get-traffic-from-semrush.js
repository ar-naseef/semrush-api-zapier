let output;

const execute = async (inputData) => {
  const domain = inputData.domain;
  const country_code = inputData.country_code;
  const store = StoreClient("0173e497-f250-494c-80ba-1adab8b8f16e");
  const SEMRUSH_API_KEY = await store.get("semrush_api_key");

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
    est_adwords_cost: jsonResp[0]["Adwords Cost"],
  };

  console.log("output >>", output);
};

execute({
  domain: "kitchentime.se",
  country_code: "se",
});
