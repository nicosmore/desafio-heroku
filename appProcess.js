const express = require("express");
const apisRoutesProcess = require("./process/app.routers.fork");
const logger = require("./logger/winston");

const PORT = process.env.PORT || 8080;

const app = express();

app.use("/api", apisRoutesProcess);

//app.use(logger);

app.get("/", (req, res) => {
  res.send("HOME");
});

//Muestra servidor
app.get("/datos", (req, res) => {
  const html = `Servidor express <span style="color: coral; font-weight: bold;">(NginX)</span> | ${PORT} - <b>PID => ${
    process.pid
  }</b> - ${new Date().toLocaleString()}`;
  res.send(html);
});

app.use("*", (req, res) => {
  res
    .status(404)
    .send({
      error: -2,
      descripcion: `ruta ${req.baseUrl} metodo ${req.method} no implementado`,
    });
  if (res.status(404)) logger.warn("Ruta no existente");
});
app.set("port", PORT)

/* app.listen(PORT, () => {
  console.log('Server listening on', PORT);
}); */
