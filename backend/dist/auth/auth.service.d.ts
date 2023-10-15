import { SigninUserDto } from './dto/signin-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
export declare class AuthService {
    private usersService;
    private jwtService;
    private usersRepository;
    constructor(usersService: UsersService, jwtService: JwtService, usersRepository: Repository<User>);
    auth(user: User): {
        access_token: string;
    };
    signup(createUserDto: CreateUserDto): Promise<CreateUserDto & User>;
    validatePasswd({ password, username }: SigninUserDto): Promise<User>;
}
