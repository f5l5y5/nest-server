import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import * as svgCaptcha from 'svg-captcha';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller({
  path: 'login',
  version: '1',
})
@ApiTags('登录接口')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get('getDynamicCode')
  @ApiOperation({ summary: '获取动态验证码', description: '获取动态验证码' })
  createDynamicCode(@Req() req, @Res() res) {
    // console.log('打印***req,res', req.session, res.response);
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 34,
      background: '#cc9966',
    });
    console.log('打印***captcha', captcha);
    req.session.code = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Post()
  create(@Body() createLoginDto: CreateLoginDto, @Req() req) {
    console.log('打印***', createLoginDto, req.session);
    // if (
    //   createLoginDto.code.toLocaleLowerCase() ===
    //   req.session.code.toLocaleLowerCase()
    // ) {
    //   // 判断是否登录成功

    //   return this.loginService.create(createLoginDto);
    // } else {
    //   // 验证不通过，重新刷新图片
    // }
    return this.loginService.create(createLoginDto);
  }

  @Get()
  findAll() {
    return this.loginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginDto: UpdateLoginDto) {
    return this.loginService.update(+id, updateLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginService.remove(+id);
  }
}
