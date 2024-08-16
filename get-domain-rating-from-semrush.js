let output;

const execute = async (inputData) => {
  const domain = inputData.domain;
  const store = StoreClient("0173e497-f250-494c-80ba-1adab8b8f16e");
  const SEMRUSH_API_KEY = await store.get("semrush_api_key");

  const response = await fetch(
    `https://api.semrush.com/analytics/v1/?key=${SEMRUSH_API_KEY}&type=backlinks_overview&target=${domain}&target_type=root_domain&export_columns=ascore,total,domains_num,urls_num,ips_num,ipclassc_num,follows_num,nofollows_num,sponsored_num,ugc_num,texts_num,images_num,forms_num,frames_num`
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
    score: jsonResp[0]["ascore"],
  };

  console.log("output >>", output);
};

execute({
  domain: "semrush.com",
  country_code: "se",
});
