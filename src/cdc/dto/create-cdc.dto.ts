import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class DatabaseDetails {
  @IsNotEmpty()
  @IsString()
  connectorName: string;

  @IsNotEmpty()
  @IsString()
  dbName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  dbTableName?: string[];
}

export class CreateCdcDto {
  @IsNotEmpty()
  @IsString()
  dbHost: string;

  @IsNotEmpty()
  @IsNumber()
  dbPort: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => DatabaseDetails)
  config: DatabaseDetails[];

  @IsNotEmpty()
  @IsString()
  dbUsername: string;

  @IsNotEmpty()
  @IsString()
  dbPassword: string;
}
