import { Module } from '@nestjs/common';
import { CoffeeRatingService } from 'src/service/coffee-rating/coffee-rating.service';
import { CoffeeService } from 'src/service/coffee/coffee.service';
import { CoffeesModule } from '../coffees/coffees.module';

@Module({
    imports: [CoffeesModule],
    providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
