const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const LIB_NAME = "common-lib";
const ROOT = path.resolve(__dirname, "../");
const LIB_PATH = path.join(ROOT, LIB_NAME);
const SITE_PATH = path.join(ROOT, "site");

// --- INCREMENTAR VERSIÓN ---
const packageJsonPath = path.join(LIB_PATH, "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

const [major, minor, patch] = packageJson.version.split(".").map(Number);
const newVersion = `${major}.${minor}.${patch + 1}`;
packageJson.version = newVersion;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log(`Versión actualizada a ${newVersion}`);

// --- LIMPIAR .tgz ANTERIORES ---
console.log("Limpiando archivos .tgz anteriores en la librería...");
fs.readdirSync(LIB_PATH)
  .filter(f => f.startsWith(LIB_NAME) && f.endsWith(".tgz"))
  .forEach(f => fs.unlinkSync(path.join(LIB_PATH, f)));

// --- EMPAQUETAR ---
console.log("Empaquetando librería...");
execSync("npm run publishLocal", {
  cwd: LIB_PATH,
  stdio: "inherit"
});

// --- ENCONTRAR .tgz GENERADO ---
const tgzFile = fs
  .readdirSync(LIB_PATH)
  .filter(f => f.startsWith(LIB_NAME) && f.endsWith(".tgz"))
  .sort()
  .reverse()[0];

if (!tgzFile) {
  console.error("No se encontró ningún .tgz generado en common-lib");
  process.exit(1);
}

const tgzPath = path.join(LIB_PATH, tgzFile);

// --- INSTALAR EN SITE ---
if (fs.existsSync(path.join(SITE_PATH, "package.json"))) {
  const siteLibs = path.join(SITE_PATH, "libs");
  if (!fs.existsSync(siteLibs)) fs.mkdirSync(siteLibs);

  fs.readdirSync(siteLibs)
    .filter(f => f.startsWith(LIB_NAME) && f.endsWith(".tgz"))
    .forEach(f => fs.unlinkSync(path.join(siteLibs, f)));

  const siteDest = path.join(siteLibs, tgzFile);
  fs.copyFileSync(tgzPath, siteDest);
  console.log(`Copiado ${tgzFile} a ${siteLibs}`);

  try {
    execSync(`npm uninstall ${LIB_NAME}`, {
      cwd: SITE_PATH,
      stdio: "inherit"
    });
  } catch {
    console.warn(`No se pudo desinstalar ${LIB_NAME} en site (posiblemente no estaba instalado).`);
  }

  console.log(`Instalando librería en site`);
  execSync(`npm install "./libs/${tgzFile}"`, {
    cwd: SITE_PATH,
    stdio: "inherit"
  });
} else {
  console.error("No se encontró package.json en la carpeta 'site'");
}

console.log("Librería instalada correctamente en site.");
