import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
    @Get()
    findAll(): string{
        return "This action returns all coffees!";
    }

    @Get(':id')
    findOne(@Param('id') id: string): string{
        return `This action returns the coffee number ${id}`;
    }

    @Post()
    create(@Body() body){
        return body;
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body){
        return `This action updates coffee number ${id}.`;
    }

    @Delete(':id')
    delete(@Param('id') id: string){
        return `This action deletes the coffee number ${id}`;
    }
    //Next video lesson: Implement Pagination with Query Parameters
}
