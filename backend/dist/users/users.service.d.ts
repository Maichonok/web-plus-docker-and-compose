import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { FindUserDto } from './dto/find-user.dto';
import { Wish } from '../wishes/entities/wish.entity';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
export declare class UsersService {
    private usersRepository;
    private wishesRepository;
    constructor(usersRepository: Repository<User>, wishesRepository: Repository<Wish>);
    checkUserConflict(name: string, email: string, id?: number): Promise<boolean>;
    create(createUserDto: CreateUserDto): Promise<CreateUserDto & User>;
    findOneByName(name: string): Promise<User>;
    findOneById(id: number): Promise<User>;
    findMany({ query }: FindUserDto): Promise<User[]>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    findUserWishes(userData: number | string): Promise<Wish[]>;
}
