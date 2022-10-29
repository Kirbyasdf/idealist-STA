const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  const { listing } = req.query;
  const entry = cleanData(listing);
  try {
    fs.readFile("listings-V2.JSON", "utf-8", (err, listingsJSON) => {
      if (err) {
        console.error(err);
      } else {
        allListings = JSON.parse(listingsJSON);
        //check to make sure data doesn't already exist
        const findExist = allListings.find(
          (listing) => listing.link === entry.link
        );
        if (findExist) {
          console.log(
            "entry already in DB, current DB count: ",
            allListings.length
          );
          return;
        } else {
          //write to DB
          allListings.push(entry);
          const newList = JSON.stringify(allListings, null, 2);
          console.log("current length of DB: ", allListings.length);
          fs.writeFile("listings-V2.JSON", newList, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log("new entry added");
            }
          });
        }
      }
    });

    return res.status(200).send("ok");
  } catch (e) {
    console.error(e);
  }
  return res.status(200).send();
});

const cleanData = (data) => {
  let parsedListing;
  try {
    parsedListing = JSON.parse(data);
  } catch (e) {
    console.log("\n\n");
    console.error("broken data", data);
    console.log("\n\n");
    console.error(e);
    console.log("\n\n");
  }
  //clean geotag
  let cleanGeo = parsedListing.geotag;
  cleanGeo = cleanGeo.replace(/[_]/g, ",");
  cleanGeo = cleanGeo.split("");
  cleanGeo.splice(0, 1);
  parsedListing.geotag = cleanGeo.join("");
  //clean size
  parsedListing.size = parsedListing.size.replace(/\s|null/g, "");
  //clean price
  parsedListing.price = +parsedListing.price.replace(/\s|€|,/g, "");
  //clean phone
  let cleanPhone = parsedListing.phone;
  cleanPhone = cleanPhone.split("");
  cleanPhone.unshift("+33");
  cleanPhone = cleanPhone.join("");
  parsedListing.phone = cleanPhone.replace(/\s/g, "");

  return parsedListing;
};

app.listen(3000, () => console.log("SERVER RUNNING"));
