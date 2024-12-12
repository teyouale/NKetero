import { forwardRef, Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [forwardRef(() => AuthModule.register())],
    controllers: [ServiceController],
    providers: [ServiceService],
    exports: [ServiceService],
})
export class ServiceModule { }

