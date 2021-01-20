import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { book, cancel, getSchedule, DomainError } from './application';

const server = express();

server.set('port', process.env.PORT || 3001);
server.use(cors());
server.use(bodyParser.json());

server.use(
  function userBodyInjectorMiddleware(req: Request, res: Response, next: NextFunction) {
    const user = req.header('Username');

    if (!user) return res.status(401).send('User invalid');

    req.user = user;
    next();
  }
);

server.get('/schedule', function (req: Request, res: Response) {
  res.json(getSchedule(req.user));
});

server.post('/book', function (req: Request, res: Response) {
  book(req.user, req.body.time);
  res.send();
});

server.post('/cancel', function (req: Request, res: Response) {
  cancel(req.user, req.body.time);
  res.send();
});

server.use(
  function domainErrorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {

    if (err instanceof DomainError) return res.status(400).send(err.message);

    next(err);
  }
);


server.listen(server.get('port'), () => console.log(`Server listen on port ${server.get('port')}`));


declare global {
  namespace Express {
    interface Request {
      user: string;
    }
  }
}