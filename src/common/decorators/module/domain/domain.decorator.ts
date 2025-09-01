import {
  applyDecorators,
  Module,
  ModuleMetadata,
  Provider,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

export type DomainMetaData = {
  entities?: EntityClassOrSchema[];
  services?: Provider[];
  imports?: ModuleMetadata['imports'];
  providers?: Provider[];
};

export function Domain({
  entities,
  imports,
  services,
  providers,
}: DomainMetaData) {
  const allProviders = [...(providers || []), ...(services || [])];

  return applyDecorators(
    Module({
      imports: [TypeOrmModule.forFeature(entities), ...(imports || [])],
      providers: allProviders,
      exports: services,
    }),
  );
}
