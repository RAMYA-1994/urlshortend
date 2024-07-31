module.exports = {
    jwtSecret: 'your_jwt_secret',
    jwtExpiration: '1h',
    smtpConfig: {
      host: 'smtp.your-email-provider.com',
      port: 587,
      auth: {
        user: 'your-email@example.com',
        pass: 'your-email-password',
      },
    },
  };
  