import { Global, Module } from '@nestjs/common';

import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
// import { ProfileController } from './profile/profile.controller';
// import { ProfileModule } from './profile/profile.module';
import { BusinessModule } from './business/business.module';
// import { BusinessService } from './business/business.service';
import { AuthService } from './auth/auth.service';
// import { ReservationService } from './reservation/reservation.service';
import { ReservationModule } from './reservation/reservation.module';
import { CategoriesModule } from './categories/categories.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { ServiceModule } from './service/service.module';
import path from "node:path";


@Global()
@Module({
  imports: [
    PrismaModule.forRoot({ isGlobal: true }),
    AuthModule.register(),
    ConfigModule,
    UserModule,
    // ProfileModule,
    BusinessModule,
    ReservationModule,
    CategoriesModule,
    ServiceModule,
    ServeStaticModule.forRoot({
      renderPath: '/*',
      rootPath: path.join(__dirname, '..', 'frontend'),
    }),
    // ServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
