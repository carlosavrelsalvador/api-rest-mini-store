import { IsNotEmpty } from "class-validator";

export class CreateCartDTO {
  id?: number;

  @IsNotEmpty()
  product_id: number;

  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  count: number;

  @IsNotEmpty()
  ammount: number;
}
