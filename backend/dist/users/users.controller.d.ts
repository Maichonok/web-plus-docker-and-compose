import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { DataSource } from 'typeorm';
export declare class UsersController {
    private readonly usersService;
    private readonly dataSource;
    constructor(usersService: UsersService, dataSource: DataSource);
    ownProfile(req: any): Promise<import("./entities/user.entity").User>;
    update(req: any, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    myWishes(req: any): Promise<import("../wishes/entities/wish.entity").Wish[]>;
    find(findUserDto: FindUserDto): Promise<import("./entities/user.entity").User[]>;
    userProfile(username: string): Promise<import("./entities/user.entity").User>;
    userWishes(req: any, username: string): Promise<import("../wishes/entities/wish.entity").Wish[]>;
}
