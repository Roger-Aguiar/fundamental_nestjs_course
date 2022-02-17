import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CoffeeDto } from 'src/dto/coffee/coffee.dto';
import { CoffeeService } from 'src/service/coffee/coffee.service';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeeService: CoffeeService) {}

    @Get()
    findAll(@Query() paginationQuery){
        //const {limit, offset} = paginationQuery;
        return this.coffeeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.coffeeService.findOne(id);
    }

    @Post()
    create(@Body() createCoffee: CoffeeDto){
        return this.coffeeService.create(createCoffee);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCoffee: CoffeeDto){
        return this.coffeeService.update(id, updateCoffee);
    }

    @Delete(':id')
    delete(@Param('id') id: string){
        return this.coffeeService.remove(id);
    }
    //Next video lesson: Validate Input Data with Data Transfer Objects
}
