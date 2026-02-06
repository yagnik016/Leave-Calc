const { Module } = require('@nestjs/common');
const { MongooseModule } = require('@nestjs/mongoose');
const { ConfigModule } = require('@nestjs/config');
const { JwtModule } = require('@nestjs/jwt');
const { PassportModule } = require('@nestjs/passport');

// Simple auth module without decorators
class AuthModule {}

// Simple users module without decorators  
class UsersModule {}

// Simple leave module without decorators
class LeaveModule {}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../BE/.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    UsersModule,
    LeaveModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
    }),
  ],
})
class AppModule {}

module.exports = { AppModule };
