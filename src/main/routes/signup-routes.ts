import { Router } from 'express';

import { routeAdapter } from '../adapter';
import { makeSignUpController } from '../factories';

export default (router: Router): void => {
  router.post('/signup', routeAdapter(makeSignUpController()));
};
