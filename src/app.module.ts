import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './modules/coffees/coffees.module';

@Module({
  imports: [CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '983453069',
      database: 'coffees_database',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,//Remember to enable this property to "false" when putting the application in production.
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
