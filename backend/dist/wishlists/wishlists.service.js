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
exports.WishlistsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const wish_entity_1 = require("../wishes/entities/wish.entity");
const wishlist_entity_1 = require("./entities/wishlist.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let WishlistsService = class WishlistsService {
    constructor(wishlistRepository, usersRepository) {
        this.wishlistRepository = wishlistRepository;
        this.usersRepository = usersRepository;
    }
    async create(userId, createWishlistDto) {
        const items = createWishlistDto.itemsId.map((ele) => {
            const wish = new wish_entity_1.Wish();
            wish.id = ele;
            return wish;
        });
        const { id } = await this.wishlistRepository.save({
            ...createWishlistDto,
            owner: userId,
            items: items,
        });
        return this.wishlistRepository.findOne({
            relations: ['owner', 'items'],
            where: { id },
        });
    }
    findAll(id) {
        return this.wishlistRepository.find({
            relations: { owner: true, items: true },
            where: {
                owner: {
                    id: id,
                },
            },
        });
    }
    findOne(id) {
        return this.wishlistRepository.findOne({
            relations: { items: true, owner: true },
            where: { id },
        });
    }
    async update(userId, id, updateWishlistDto) {
        const wishlist = await this.findOne(id);
        if (!wishlist)
            throw new common_1.NotFoundException('Your wishlist has not been found.');
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (user.id !== wishlist.owner.id)
            throw new common_1.UnauthorizedException('Сannot change wishlists of others.');
        await this.wishlistRepository.save({
            id,
            ...updateWishlistDto,
        });
        return this.findOne(id);
    }
    async remove(userId, id) {
        const wishlist = await this.findOne(id);
        if (!wishlist)
            throw new common_1.NotFoundException('Your wishlist has not been found.');
        if (wishlist.owner.id !== userId)
            throw new common_1.UnauthorizedException('Сannot change wishlists of others.');
        await this.wishlistRepository.delete(id);
        return wishlist;
    }
};
exports.WishlistsService = WishlistsService;
exports.WishlistsService = WishlistsService = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wishlist_entity_1.Wishlist)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], WishlistsService);
//# sourceMappingURL=wishlists.service.js.map