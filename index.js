const app = require("./api/server");

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`\n*** Server listening on port ${PORT} ***\n`);
});
