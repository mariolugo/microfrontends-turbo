const fs = require("fs");

const space = "@mftest";
const apps = ["root-config", "app1", "app2"];

const args = process.argv.slice(2);
function createImportMap(parameters) {
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
      importMap.imports[`${space}/${app}`] = map;
    }
  });

  function createImportMapFile() {
    const dictstring = JSON.stringify(jsObjectLocations);
    console.log(dictstring);

    fs.writeFile("importmap.json", dictstring, function (err, result) {
      if (err) console.log("error", err);
    });
  }

  createImportMapFile();

  console.log("CREATED FILE");

  return true;
}

createImportMap(args);
