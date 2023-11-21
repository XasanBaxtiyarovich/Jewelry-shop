import { JwtService } from "@nestjs/jwt";
import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Admin } from "../admins/entities/admin.entity";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    async canActivate(context: ExecutionContext){
        const req = context.switchToHttp().getRequest();

        const authHeader = req.headers.authorization;
        if(!authHeader) throw new UnauthorizedException('Unautorized');

        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];
        if(bearer != 'Bearer' || !token) throw new UnauthorizedException('Unauthorized');

        try {
            const admin: Partial<Admin> = await this.jwtService.verify(token, {secret: process.env.ACCES_TOKEN_KEY_ADMIN || 'MyAccesVery1' });

            if(!admin) throw new UnauthorizedException('Invalid token provided');

            if(!admin.is_active) throw new BadRequestException('Admin is not active');
    
            return true;
        } catch (error) {
            throw new UnauthorizedException('Token verify error');
        }
    }
}