// import fs from "fs";
// import path from "path";

const space = "@mftest";
const apps = ["root-config", "app1", "app2"];

const args = process.argv.slice(2);
const createImportMap = (parameters) => {
  console.log("params", parameters);
  const objectKey = parameters[0];
  const objectLocations = parameters[1].replace(/\[|\]/g, "").split(",");

  const jsObjectLocations = objectLocations.filter(
    (env) => env.includes(".js") && !env.includes(".js.")
  );

  const importMap = {
    imports: {
      react:
        "https://cdn.jsdelivr.net/npm/react@17.0.2/umd/react.production.min.js",
      "react-dom":
        "https://cdn.jsdelivr.net/npm/react-dom@17.0.2/umd/react-dom.production.min.js",
      "single-spa":
        "https://cdn.jsdelivr.net/npm/single-spa@5.8.2/lib/system/single-spa.min.js",
    },
  };

  apps.forEach((app) => {
    const map = jsObjectLocations.find((location) => location.includes(app));
    if (map) {
      importMap[`${space}/app`] = map;
    }
  });

  console.log(importMap);
};

createImportMap(args);
