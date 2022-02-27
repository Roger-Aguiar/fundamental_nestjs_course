import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { COFFEE_BRANDS } from 'src/constants/coffees.constants';
import { CoffeesController } from 'src/controllers/coffees/coffees.controller';
import { Coffee } from 'src/entities/coffee/coffee.entity';
import { Flavor } from 'src/entities/flavors/flavor.entity';
import { CoffeeService } from 'src/service/coffee/coffee.service';

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor])],
    controllers: [CoffeesController],
    providers: [CoffeeService, {provide: COFFEE_BRANDS, useValue: ['budy brew', 'nescafe']}],
    exports: [CoffeeService]
})
export class CoffeesModule { }
