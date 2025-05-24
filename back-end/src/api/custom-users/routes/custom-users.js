'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/custom-users',
      handler: 'custom-users.findUsersWithBrands',
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};
