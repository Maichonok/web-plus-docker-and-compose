"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const wish_entity_1 = require("../wishes/entities/wish.entity");
let UsersService = class UsersService {
    constructor(usersRepository, wishesRepository) {
        this.usersRepository = usersRepository;
        this.wishesRepository = wishesRepository;
    }
    async checkUserConflict(name, email, id = null) {
        const nameFound = name && (await this.findOneByName(name));
        const emailFound = email && (await this.usersRepository.findOneBy({ email }));
        const nameConflict = nameFound && nameFound.id !== id;
        const emailConflict = emailFound && emailFound.id !== id;
        if (nameConflict || emailConflict)
            throw new common_1.ConflictException(`Пользователь с таким ${nameConflict ? 'именем' : 'мылом'} уже зарегистрирован.`);
        return false;
    }
    async create(createUserDto) {
        await this.checkUserConflict(createUserDto.username, createUserDto.email);
        return this.usersRepository.save(createUserDto);
    }
    findOneByName(name) {
        return this.usersRepository.findOneBy({ username: name });
    }
    findOneById(id) {
        return this.usersRepository.findOneBy({ id });
    }
    async findMany({ query }) {
        const result = await this.usersRepository
            .createQueryBuilder('user')
            .where('user.username = :query OR user.email = :query', { query })
            .getMany();
        return result;
    }
    async update(id, updateUserDto) {
        await this.checkUserConflict(updateUserDto.username, updateUserDto.email, id);
        if ('password' in updateUserDto) {
            updateUserDto.password = bcrypt.hashSync(updateUserDto.password, 10);
        }
        await this.usersRepository.save({ ...updateUserDto, id });
        return this.findOneById(id);
    }
    remove(id) {
        return this.usersRepository.delete(id);
    }
    async findUserWishes(userData) {
        const user = new user_entity_1.User();
        if (typeof userData === 'string') {
            const userId = await this.findOneByName(userData);
            if (!userId)
                throw new common_1.NotFoundException('Пользователь не найден.');
            user.id = userId.id;
        }
        else
            user.id = userData;
        return this.wishesRepository.find({
            relations: {
                owner: true,
                offers: true,
            },
            where: { owner: user, offers: [{ hidden: false }, { id: (0, typeorm_2.IsNull)() }] },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(wish_entity_1.Wish)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map