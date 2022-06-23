const app = require("./index");

const connect = require("./configs/db");
const port = 3000;
app.listen(port, async () => {
  try {
    await connect();
  } catch (err) {
    console.log(err);
  }
  console.log(`Running ${port} >>>>>`)
});
