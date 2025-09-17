import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "src/common/decorators/module/controller/rbac.controller";
import { Role } from "src/modules/blogs/domain/dtos/CreateBlog.dto";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if ( !requiredRoles || requiredRoles.length === 0 ) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        if ( !user || !requiredRoles.includes(user.role)) {
            throw new ForbiddenException('You do not have access to this resource');
        }

        return true;
    }
}