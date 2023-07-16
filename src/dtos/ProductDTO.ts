import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { IsUnique } from "../validators/IsUniqueValidator";
import { Products } from "../entity/Products";

export class CreateProductDTO {
  id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  description: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  status: "Active";
}

export class UpdateProductDTO {
  id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  description: string;

  @IsNotEmpty()
  @IsString()
  category: string;
}

export class StatusProductDTO {
  id?: number;

  @IsNotEmpty()
  @IsString()
  status: string;
}
