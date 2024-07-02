import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UserController {
   constructor(private usersService: UsersService) {}

  @Get()
  findAll():string {
    return "All Users"; 
  }

  @Post()
  createUser(@Body() body ) {
    this.usersService.create()
  }
}
 