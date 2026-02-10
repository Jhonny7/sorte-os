const fs = require("fs");
const { spawn } = require("child_process");
const path = require("path");

// --- LEE EL ARGUMENTO DE SCHEMA ---
const schemaArg = process.argv[2];

if (!schemaArg) {
  console.error("Debes proporcionar el schema como argumento.");
  console.error("Ejemplo: node backupGenerator.js core");
  process.exit(1);
}

const environment = {
  outPath: process.cwd() + "/",
  outName: `backup_${schemaArg}`,
  password: "23dejulio08F!",
  port: 5432,
  host: "195.35.37.37",
  schema: `"${schemaArg}"`,  
  userName: "admin",
  dbName: "olamsys", 
  activeLocal: false,
};

const environmentLocal = {
  password: "admin123",
  port: 5432,
  host: "localhost",
  schema: `"${schemaArg}"`,
  userName: "postgres",
  dbName: "postgres",
};

const commandPostgres = "psql";

if (environment.activeLocal) {
  const dumpFilePath = path.join(environment.outPath, `${environment.outName}.sql`);
  processDumpFile(dumpFilePath);
} else {
  const command = "pg_dump";
  const args = [
    "--verbose",
    `--host=${environment.host}`,
    `--port=${environment.port}`,
    `--username=${environment.userName}`,
    "--format=p",
    "--inserts",
    `--file=${environment.outPath}${environment.outName}.sql`,
    "-n",
    environment.schema,
    environment.dbName,
  ];

  const options = { env: { ...process.env, PGPASSWORD: environment.password } };

  const dumpProcess = spawn(command, args, options);

  dumpProcess.stdout.on("data", (data) => {
    console.log(`${data}`);
  });

  dumpProcess.stderr.on("data", (data) => {
    console.error(`${data}`);
  });

  dumpProcess.on("close", (code) => {
    if (code === 0) {
      console.log("Dump completado exitosamente.");
      const dumpFilePath = path.join(environment.outPath, `${environment.outName}.sql`);
      processDumpFile(dumpFilePath);
    } else {
      console.error(`El proceso terminó con un código de error: ${code}`);
    }
  });
}

function processDumpFile(dumpFilePath) {
  console.log("Procesando archivo SQL...");
  fs.readFile(dumpFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo:", err);
      return;
    }

    // Ya no hay reemplazo porque no tienes targetWord / replaceWith
    fs.writeFile(dumpFilePath, data, "utf8", async (err) => {
      if (err) {
        console.error("Error al escribir el archivo:", err);
        return;
      }

      console.log("Archivo guardado.");
      await dropSchema();
      await executeDumpInDatabase();
    });
  });
}

const dropSchema = async () => {
  console.log(`Borrando esquema ${environmentLocal.schema}...`);
  try {
    await executeCommand(
      commandPostgres,
      [
        `--host=${environmentLocal.host}`,
        `--port=${environmentLocal.port}`,
        `--username=${environmentLocal.userName}`,
        "--dbname=" + environmentLocal.dbName,
        "-c",
        `DROP SCHEMA IF EXISTS ${environmentLocal.schema} CASCADE;`,
      ],
      { env: { ...process.env, PGPASSWORD: environmentLocal.password } }
    );

    console.log(`Esquema ${environmentLocal.schema} eliminado.`);
  } catch (error) {
    console.error(`Error al eliminar el esquema ${environmentLocal.schema}:`, error);
  }
};

const executeDumpInDatabase = async () => {
  console.log("Restaurando el dump en la base de datos...");
  try {
    await executeCommand(
      commandPostgres,
      [
        `--host=${environmentLocal.host}`,
        `--port=${environmentLocal.port}`,
        `--username=${environmentLocal.userName}`,
        "--dbname=" + environmentLocal.dbName,
        "--set=ON_ERROR_STOP=off",
        "-f",
        path.join(environment.outPath, `${environment.outName}.sql`),
      ],
      { env: { ...process.env, PGPASSWORD: environmentLocal.password } }
    );

    console.log("Dump restaurado exitosamente.");
  } catch (error) {
    console.error("Error al restaurar el dump:", error);
  }
};

const executeCommand = (command, args, options) => {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, options);

    let stdout = "";
    let stderr = "";

    process.stdout.on("data", (data) => {
      stdout += data.toString();
      console.log(data.toString());
    });

    process.stderr.on("data", (data) => {
      stderr += data.toString();
      console.error(data.toString());
    });

    process.on("close", (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        reject(`Error: ${stderr}`);
      }
    });
  });
};
