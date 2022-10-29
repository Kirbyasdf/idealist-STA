for (const e of Array.from(document.querySelectorAll("[data-id]"))) {
  await new Promise((resolve) => {
    console.log("clicking on", e.dataset.id);
    e.click();
    setTimeout(() => {
      console.log("waited 1.5 secs");

      // run js to extract
      const obj = {
        geotag: e.dataset.id,
        price: e.innerText,
        size: document.querySelector(
          ".rs-light-adcard_main-link span[role=list]"
        ).title,
        link: document.querySelector(".rs-light-adcard_main-link").href,
        title: document.querySelector(
          ".rs-light-adcard_main-link span[role=heading]"
        ).innerText,
        agency: document.querySelector(
          "#react-map-item-delivery > div > article > div > a.rs-light-adcard_company-link"
        ).title,
        phone: document.querySelector(
          ".rs-light-adcard_actions span.rs-light-adcard_actions_button"
        ).title,
      };
      fetch("http://localhost:3000/?listing=" + JSON.stringify(obj));
      console.log("new data", obj);
      resolve(); // done move to the next one
    }, 1500);
  });
}
