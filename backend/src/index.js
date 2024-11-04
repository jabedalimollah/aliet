import dotnev from "dotenv";
import { app } from "./app.js";
dotnev.config();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server runnig on Port ${PORT}`);
});
