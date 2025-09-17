import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

export function ApiFile(fieldName: string = 'file') {
  return applyDecorators(
    UseInterceptors(FileInterceptor(fieldName)),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      description: 'File upload',
      required: true,
      schema: {
        type: 'object',
        properties: {
          [fieldName]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
  );
}