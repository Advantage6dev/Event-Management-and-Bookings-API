import express from 'express';
import eventRouter from './routes/event.route.js';
import bookingsRouter from './routes/bookings.route.js';
import morgan from 'morgan';
import { handleError } from './middleware/error.middleware.js';

const app = express();
const port = 8000;

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (request, response) => {
  response.status(200).json({
    success: true,
    message: 'Welcome to event management and booking server',
  });
});
app.use('/events', eventRouter);
app.use('/bookings', bookingsRouter);

app.use((request, response) => {
  response.status(404).json({
    success: true,
    message: 'Route not found',
  });
});

app.use(handleError);

app.listen(port, () => console.log(`server is running on port ${port}`));
