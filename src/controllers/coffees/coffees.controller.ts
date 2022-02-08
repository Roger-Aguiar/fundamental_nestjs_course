import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
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
    create(@Body() body){
        return this.coffeeService.create(body);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body){
        return this.coffeeService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: string){
        return this.coffeeService.remove(id);
    }
    //Next video lesson: Send User-Friendly Error Messages
}
