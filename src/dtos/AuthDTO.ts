import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Users } from "./../entity/User";
import { IsUnique } from "./../validators/IsUniqueValidator";

export class RegisterDTO {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsUnique(Users, "email")
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  password: string;
}

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  password: string;
}
