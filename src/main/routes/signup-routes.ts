import { Router } from 'express';

import { routeAdapter } from '../adapter';
import { makeSignUpController } from '../factories/signup';

export default (router: Router): void => {
  router.post('/signup', routeAdapter(makeSignUpController()));
};
