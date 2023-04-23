import { IsNotEmpty, IsString, Length } from 'class-validator';
export class CreateLoginDto {
  @IsNotEmpty()
  @IsString({})
  @Length(3, 10, {
    message: '名称在3-10个字符之间',
  })
  name: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  @Length(4, 4, { message: 'code长度为4个字符' })
  code: string;
}
