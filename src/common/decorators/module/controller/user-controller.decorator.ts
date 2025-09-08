import { applyDecorators, Controller, ControllerOptions } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserAuth } from 'src/modules/user/decorators/user-auth.decorator';
import { toTitleCase } from 'src/utils/title-case';

export interface UserControllerOptions extends Omit<ControllerOptions, 'path'> {
  tags?: string | string[];
  path?: string;
}

/**
 * Decorator for creating admin-specific controllers with:
 * - Automatic `/admin` route prefix
 * - Dynamic Swagger API tags (e.g., "Admin Post" for path 'post')
 * - Admin authentication guard
 *
 * @param options Can be either:
 *   - ControllerOptions (path will be prefixed with '/admin')
 *   - string (will create path '/admin/{string}' and auto-generated tag)
 * @returns Composed decorator
 */

export function UserController(
  options: UserControllerOptions | string = {},
  settingOptions: { auth: boolean } = { auth: true },
) {
  if (typeof options === 'string') {
    const path = options.trim();
    const decorators = [ApiTags(`${toTitleCase(path)}`), Controller(path)];

    if (settingOptions.auth) {
      return applyDecorators(...decorators, UserAuth());
    }
    return applyDecorators(...decorators);
  }

  const controllerOptions: ControllerOptions = { ...options };
  const path = options?.path?.trim() || '';
  controllerOptions.path = path;

  const tagName = controllerOptions.path?.includes('/')
    ? 'User'
    : `${toTitleCase(controllerOptions.path)}`;

  const tags = Array.isArray(options?.tags) ? options.tags : [tagName];

  const decorators = [ApiTags(...tags), Controller(controllerOptions)];

  if (settingOptions.auth) {
    return applyDecorators(...decorators, UserAuth());
  }
  return applyDecorators(...decorators);
}
