import express, { NextFunction, Request, Response } from 'express';
import { createBoxes } from './createBoxes/createBoxes';
import bodyParser from 'body-parser';

const app = express();
const PORT = 8200;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.get('/', (req,res) => res.send('Express + TypeScript Server'));

app.get('/createBoxes', (req: Request, res: Response, next: NextFunction) => {
  const articles = req.query.articles as string || '';

  const result = createBoxes(articles);

  res.status(200).json(result);
});

app.listen(PORT, () => {

  // console.log('test ', createBoxes('163841689525773'));
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
