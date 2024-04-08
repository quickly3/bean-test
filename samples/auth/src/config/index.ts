export default () => {
  return {
    jwt: {
      secret: process.env.JWT_SECRET || 'm&XAFzBpM3es',

      expiresIn: process.env.JWT_EXPIRES_IN || '10d',
      refreshIn: process.env.JWT_REFRESH_IN || '7d',
    },
    password: {
      bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10,
    },
    apikey: process.env.API_KEY || 'xxx',
  };
};
