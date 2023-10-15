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
exports.WishesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const wish_entity_1 = require("./entities/wish.entity");
const typeorm_2 = require("typeorm");
let WishesService = class WishesService {
    constructor(dataSource, wishesRepository) {
        this.dataSource = dataSource;
        this.wishesRepository = wishesRepository;
    }
    async create(id, createWishDto) {
        return this.wishesRepository.save({
            ...createWishDto,
            owner: id,
            copied: 0,
            raised: 0,
        });
    }
    findLatest() {
        return this.wishesRepository.find({
            relations: { owner: true, offers: true },
            where: { offers: [{ hidden: false }, { id: (0, typeorm_2.IsNull)() }] },
            order: { createdAt: 'DESC' },
            take: 40,
        });
    }
    findPopular() {
        return this.wishesRepository.find({
            relations: { owner: true, offers: true },
            where: { offers: [{ hidden: false }, { id: (0, typeorm_2.IsNull)() }] },
            order: { copied: 'DESC' },
            take: 20,
        });
    }
    async findOne(id) {
        const result = await this.wishesRepository.findOne({
            relations: ['owner', 'offers', 'offers.user'],
            where: { id, offers: [{ hidden: false }, { id: (0, typeorm_2.IsNull)() }] },
        });
        if (!result)
            throw new common_1.NotFoundException('Your wish has not been found.');
        return result;
    }
    async update(userId, id, updateWishDto) {
        const wish = await this.findOne(id);
        if (wish.owner.id !== userId)
            throw new common_1.UnauthorizedException('Сannot change the wishes of others.');
        if (wish.raised > 0 && updateWishDto.price)
            throw new common_1.ForbiddenException('Money has already been chipped on this wish.');
        await this.wishesRepository.save({ ...updateWishDto, id });
        return {};
    }
    async remove(userId, id) {
        const wish = await this.findOne(id);
        if (wish.owner.id !== userId)
            throw new common_1.UnauthorizedException('Сannot delete the wishes of others.');
        if (wish.raised > 0)
            throw new common_1.ForbiddenException('Money has already been chipped on this wish.');
        await this.wishesRepository.delete(id);
        return wish;
    }
    async copy(userId, id) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        const wish = await this.findOne(id);
        const newWish = { ...wish, owner: userId, copied: 0, raised: 0 };
        delete newWish.id;
        wish.copied++;
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.save(wish_entity_1.Wish, wish);
            await queryRunner.manager.save(wish_entity_1.Wish, newWish);
            await queryRunner.commitTransaction();
            return {};
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw new common_1.InternalServerErrorException('A server error has occurred.');
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.WishesService = WishesService;
exports.WishesService = WishesService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(wish_entity_1.Wish)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository])
], WishesService);
//# sourceMappingURL=wishes.service.js.map