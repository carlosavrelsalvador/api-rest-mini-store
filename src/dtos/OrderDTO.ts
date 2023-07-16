import { IsNotEmpty } from "class-validator";

export class CreateOrderDTO {
  id?: number;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  totalAmount: number;
}
