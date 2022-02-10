import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from 'src/entities/coffee/coffee.entity';

@Injectable()
export class CoffeeService {
    private coffees: Coffee[] = [
        {
            id: 1,
            name: 'Shipwreck Roast',
            brand: 'Buddy Brew',
            flavors: ['chocolate', 'vanilla'],
        },
    ];

    findAll() {
        return this.coffees;
    }

    findOne(id: string) {
        const coffee = this.coffees.find(item => item.id === +id);
        if(!coffee){
            throw new NotFoundException(`Sorry! Coffee with id ${id} was not found. Check the one and try again.`);
        }
        return coffee;
    }

    create(createCoffeeDto: any) {
        this.coffees.push(createCoffeeDto);
    }

    update(id: string, updateCoffeeDto: any) {
        const existingCoffee = this.findOne(id);
        if(existingCoffee){
            //Update here
        }
    }

    remove(id: string) {
        const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
        if(coffeeIndex >= 0){
            this.coffees.splice(coffeeIndex, 1);
        }
    }
}
