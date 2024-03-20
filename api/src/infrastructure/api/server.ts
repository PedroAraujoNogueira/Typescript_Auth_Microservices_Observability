import { app } from "./app"
import dotenv from "dotenv";

dotenv.config();
const port: number = Number(process.env.PORT) || 3333;

app.listen({ host: process.env.HOST ?? "localhost", port }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server ${new Date()} listening at ${address}`);
});

// app.listen(3333, () => console.log("Server is running Express!"));
