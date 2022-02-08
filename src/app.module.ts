import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './controllers/coffees/coffees.controller';
import { CoffeeService } from './service/coffee/coffee.service';

@Module({
  imports: [],
  controllers: [AppController, CoffeesController],
  providers: [AppService, CoffeeService],
})
export class AppModule {}
