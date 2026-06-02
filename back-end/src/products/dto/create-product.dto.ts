import { IsIn, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  category: string;

  @IsString()
  @IsIn(["men", "women", "kids"])
  gender: string;
}