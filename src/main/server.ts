import { MongoHelper } from '../infra/db/mongodb/utils';
import { MONGO, SERVER } from '../utils/constants';
import app from './config/app';

const mongoHelper = MongoHelper.getInstance();

mongoHelper
  .connect(MONGO.URL)
  .then(() => {
    app.listen(SERVER.PORT, () =>
      console.log(`Server is running on port: ${SERVER.PORT}`)
    );
  })
  .catch(console.error);
