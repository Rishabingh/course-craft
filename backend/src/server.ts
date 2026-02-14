import { connectDB } from './database/index.js';
import { app } from './app.js';

const startServer = async () => {
  try {
    await connectDB();

    const port = Number(process.env.PORT) || 3000;

    app.listen(port, () => {
      console.log(`app is listening at http://localhost:${port}/`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
