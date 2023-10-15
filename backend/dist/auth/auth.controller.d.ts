import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signin(req: any): Promise<{
        access_token: string;
    }>;
    signup(user: CreateUserDto): Promise<{
        access_token: string;
    }>;
}
