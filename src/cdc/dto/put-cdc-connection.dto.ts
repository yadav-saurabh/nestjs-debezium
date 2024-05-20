import { IsString, IsNotEmpty } from 'class-validator';

export class PutCdcConnectionDto {
  @IsNotEmpty()
  @IsString()
  connector: string;
}
