import { Router } from 'express';

import { routeAdapter } from '../adapters';
import { makeLoginController, makeSignUpController } from '../factories';

export default (router: Router): void => {
  router.post('/signup', routeAdapter(makeSignUpController()));
  router.post('/login', routeAdapter(makeLoginController()));
};
