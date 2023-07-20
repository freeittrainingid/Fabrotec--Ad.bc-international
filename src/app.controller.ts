// src/app.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Post('addMultiple')
  async addMultipleUsers(
    @Body() body,
  ): Promise<{ status: string; dbState: string[] }> {
    const { type, cmd_chain } = body;
    if (type !== 'my_login') {
      return { status: 'error', dbState: [] };
    }

    return this.userService.addMultipleUsers(cmd_chain.map((item) => item.cmd));
  }
}
