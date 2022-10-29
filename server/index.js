const express = require("express");
const fs = require("fs");
const app = express();

app.get("/", (req, res) => {
  const { listing } = req.query;

  const entry = cleanData(listing);

  console.log(entry);

  try {
    // fs.readFile("listings.json", "utf8", function readFileCallback(err, data) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     obj = JSON.parse(data); //now it an object
    //     obj.push(entry); //add some data
    //     json = JSON.stringify(obj); //convert it back to json
    //     fs.writeFile("myjsonfile.json", json, "utf8", callback); // write it back
    //   }
    // });
  } catch (e) {
    console.error(e);
  }
  res.send();
});

const cleanData = (data) => {
  const parsedListing = JSON.parse(data);
  let cleanGeo = parsedListing.geotag;
  cleanGeo = cleanGeo.replace(/[_]/g, ",");
  cleanGeo = cleanGeo.split("");
  cleanGeo.splice(0, 1);
  parsedListing.geotag = cleanGeo.join("");
  parsedListing.size = parsedListing.size.replace(/\s|null/g, "");
  parsedListing.price = +parsedListing.price.replace(/\s|€|,/g, "");
  // parsedListing.price = parseInt(parsedListing.price);
  let cleanPhone = parsedListing.phone;
  console.log(cleanPhone);
  cleanPhone = cleanPhone.split("");
  cleanPhone.unshift("+33");
  console.log("after split", cleanPhone);
  cleanPhone = cleanPhone.join("");
  console.log("after join", cleanPhone);
  parsedListing.phone = cleanPhone.replace(/\s/g, "");

  return parsedListing;
};

app.listen(3000);
