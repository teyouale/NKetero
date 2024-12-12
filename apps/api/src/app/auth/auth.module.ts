import { DynamicModule, Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { RefreshStrategy } from './strategies/refresh.strategy';
// import { BusinessModule } from '../business/business.module';
// import { ReservationModule } from '../reservation/reservation.module';
@Module({})
export class AuthModule {
  static register(): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        PassportModule,
        JwtModule,
        UserModule,
        // BusinessModule,
        // ReservationModule,
      ],
      controllers: [AuthController],
      providers: [AuthService, LocalStrategy, JwtStrategy, RefreshStrategy],
      exports: [AuthService],
    };
  }
}
