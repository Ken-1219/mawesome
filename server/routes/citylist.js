const express = require("express");
const router = express.Router();
const cityData = require("../city.list.json");

require("dotenv").config();

const getCityList = (searchTerm) => {
  return new Promise((resolve, reject) => {
    try {
      const term = searchTerm.toLowerCase();
      let results = [];

      for (let city of cityData) {
        if (city.name.toLowerCase().startsWith(term)) {
          results.push({
            name: city.name,
            countryCode: city.country,
          });
        }
        if (results.length >= 10) {
          break;
        }
      }
      if(results.length === 0) {
        throw new Error('City not found');
      }
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
};

router.get("/:searchTerm", async (req, res) => {
  try {
    const cityList = await getCityList(req.params.searchTerm);
    res.json(cityList);
  } catch (error) {
    res.status(500).send("Failed to fetch city information");
  }
});

module.exports = router;
