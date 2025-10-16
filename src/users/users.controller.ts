import { Controller, Get, Param, Post, Body, Patch, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { multerOptions } from '../config/multer.config';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly s: UsersService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get() list() {
    return this.s.findAll();
  }

  @Get(':id') one(@Param('id') id: string) {
    return this.s.findOne(id);
  }

  @Post() create(@Body() createUserDto: CreateUserDto) {
    return this.s.create(createUserDto);
  }

  @Patch(':id') update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.s.update(id, updateUserDto);
  }

  @Delete(':id') del(@Param('id') id: string) {
    return this.s.remove(id);
  }

  @Post(':id/avatar')
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  async uploadAvatar(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image/(jpeg|png|gif)', // Matches the fileFilter regex
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 5, // 5MB, Matches the limits
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    // Here you would typically save the file path to the user's record in the database
    // For MVP, we'll just return the file info
    console.log(`User ${id} uploaded avatar:`, file);
    return {
      message: `Avatar for user ${id} uploaded successfully`,
      filename: file.filename,
      path: file.path,
    };
  }

}
