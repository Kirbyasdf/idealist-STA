//https://www.idealista.com/en/areas/alquiler-locales/con-precio-hasta_8000,metros-cuadrados-mas-de_200,metros-cuadrados-menos-de_400,aireacondicionado/mapa-google?shape=%28%28wmxuFjgtUeh%40mx%40p%5B%7BfDzt%40ct%40hs%40bAcL%7EgApNjx%40xdAvIlS%60%5E%7DNdaBiiD%7CD%29%29

for (const e of Array.from(document.querySelectorAll("[data-id]"))) {
  await new Promise((resolve) => {
    console.log("clicking on", e.dataset.id);
    e.click();
    setTimeout(() => {
      console.log("waited 1.5 secs");

      // run js to extract
      const obj = {
        geotag: e.dataset?.id || "",
        price: e?.innerText || "",
        size:
          document.querySelector(".rs-light-adcard_main-link span[role=list]")
            ?.title || "",
        link: document.querySelector(".rs-light-adcard_main-link")?.href || "",
        title:
          document.querySelector(
            ".rs-light-adcard_main-link span[role=heading]"
          )?.innerText || "",
        agency:
          document.querySelector(
            "#react-map-item-delivery > div > article > div > a.rs-light-adcard_company-link"
          )?.title || "",
        phone:
          document.querySelector(
            ".rs-light-adcard_actions span.rs-light-adcard_actions_button"
          )?.title || "",
      };
      console.log("new data", obj);
      fetch("http://localhost:3000/?listing=" + JSON.stringify(obj));
      resolve(); // done move to the next one
    }, 1500);
  });
}
