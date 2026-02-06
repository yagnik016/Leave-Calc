const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./BE/src/app.module');

let app;

module.exports = async (req, res) => {
  if (!app) {
    app = await NestFactory.create(AppModule);
    
    // Enable CORS for serverless
    app.enableCors({
      origin: true,
      credentials: true,
    });
    
    await app.init();
  }
  
  return app.getHttpAdapter().getInstance()(req, res);
};
