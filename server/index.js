const express = require("express");
const fs = require("fs");
const app = express();

app.get("/", (req, res) => {
  const { listing } = req.query;
  const parsedListing = JSON.parse(listing);
  let cleanGeo = parsedListing.geotag;
  cleanGeo = cleanGeo.replace(/[_]/g, ",");
  cleanGeo = cleanGeo.split("");
  cleanGeo.splice(0, 1);
  parsedListing.geotag = cleanGeo.join("");
  parsedListing.size = parsedListing.size.replace(/\s|null/g, "");
  // remove ,
  parsedListing.price = parsedListing.price.replace(/\s|€|,/g, "");
  parsedListing.price = parseInt(parsedListing.price);
  // add area code
  // parsedListing.number =
  console.log(parsedListing);

  try {
    // const listingString = JSON.stringify(listing, null, 4);
    // fs.writeFile("listings.JSON", listingString, (err) => {
    //   if (err) {
    //     throw err;
    //   }
    //   console.log("JSON data is saved.");
    // });
  } catch (e) {
    console.error(e);
  }
  res.send();
});

app.listen(3000);
