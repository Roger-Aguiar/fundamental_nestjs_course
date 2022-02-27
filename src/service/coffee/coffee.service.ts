import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { COFFEE_BRANDS } from 'src/constants/coffees.constants';
import { CoffeeDto } from 'src/dto/coffee/coffee.dto';
import { PaginationQueryDto } from 'src/dto/commomn/pagination-query.dto';
import { Coffee } from 'src/entities/coffee/coffee.entity';
import { Flavor } from 'src/entities/flavors/flavor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoffeeService {
    constructor(
        @InjectRepository(Coffee) private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavor) private readonly flavorRepository: Repository<Flavor>,
        @Inject(COFFEE_BRANDS) coffeeBrands: string[],) {
            console.log(coffeeBrands);
        }
    
    findAll(paginationQuery: PaginationQueryDto) {
        const {limit, offset} = paginationQuery;
        return this.coffeeRepository.find({relations: ['flavors'], skip: offset, take: limit,});
    }

    async findOne(id: string) {        
        const coffee = await this.coffeeRepository.findOne(id, {relations: ['flavors'],});
        if(!coffee){
            throw new NotFoundException(`Sorry! Coffee with id ${id} was not found. Check the one and try again.`);
        }
        return coffee;
    }

    async create(createCoffeeDto: CoffeeDto) {
        const flavors = await Promise.all(createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),);
        const coffee = this.coffeeRepository.create({...createCoffeeDto, flavors,});
        return this.coffeeRepository.save(coffee);
    }

    async update(id: string, updateCoffeeDto: CoffeeDto) {
        const flavors = updateCoffeeDto.flavors && (await Promise.all(updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),));        
        const coffee = await this.coffeeRepository.preload({id: +id, ...updateCoffeeDto, flavors,});

        if(!coffee){
            throw new NotFoundException(`Coffee ${id} not found!`);
        }
        return this.coffeeRepository.save(coffee);
    }

    async remove(id: string) {
        const coffee = await this.coffeeRepository.findOne(id);
        return this.coffeeRepository.remove(coffee);
    }

    private async preloadFlavorByName(name: string): Promise<Flavor>{
        const existingFlavor = await this.flavorRepository.findOne({name});
        if(existingFlavor){
            return existingFlavor;
        }
        return this.flavorRepository.create({name});
    }
}
