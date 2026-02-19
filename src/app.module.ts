import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { FormsModule } from './modules/forms/forms.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, FormsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
