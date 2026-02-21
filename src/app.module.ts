import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { FormsModule } from './modules/forms/forms.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma.module';
import { ConfigModule } from '@nestjs/config';
import { QuestionsModule } from './modules/questions/questions.module';
import { OptionsModule } from './modules/options/options.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    FormsModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    QuestionsModule,
    OptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
