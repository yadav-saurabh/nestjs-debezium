import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCdcDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  dbHost: string;

  @IsNotEmpty()
  @IsNumber()
  dbPort: number;

  @IsNotEmpty()
  @IsString()
  dbName: string;

  @IsNotEmpty()
  @IsString()
  dbTableName: string;

  @IsNotEmpty()
  @IsString()
  dbUsername: string;

  @IsNotEmpty()
  @IsString()
  dbPassword: string;
}
