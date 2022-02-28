import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CoffeeDto { 
    @ApiProperty({description: "The name of a coffee"})
    @IsString()
    readonly name?: string;

    @ApiProperty({description: "The brand o a coffee"})
    @IsString()
    readonly brand?: string;

    @ApiProperty({description: "The flavors of the coffee"})
    @IsString({each: true})
    readonly flavors?: string[];
}
