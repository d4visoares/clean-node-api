import { Router } from 'express';

import { routeAdapter } from '../adapters';
import { makeSignUpController } from '../factories/signup';

export default (router: Router): void => {
  router.post('/signup', routeAdapter(makeSignUpController()));
};
