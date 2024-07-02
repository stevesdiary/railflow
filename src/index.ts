require('dotenv').config()
import { AppDataSource } from "./data-source"
import bodyParser from "body-parser"
import { User } from "./entity/User"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import express from "express"
const app = express();
app.use(express.json());
app.use(bodyParser.json)
const port = process.env.LOCAL_PORT
async function bootstrap(){
  const app = await NestFactory.create(AppModule);
  // app.listen(port)
}
bootstrap();



AppDataSource.initialize().then(async () => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
  console.log("Connected to the database ✅")

}).catch(error => console.log(error))
