import {
  ObjectLiteral,
  EntityManager,
  QueryRunner,
  DeepPartial,
  SaveOptions,
  RemoveOptions,
  InsertResult,
  ObjectID,
  FindConditions,
  UpdateResult,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  Connection,
} from 'typeorm';

import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class BaseRepository<Entity extends ObjectLiteral> {
  readonly manager: EntityManager;
  readonly queryRunner?: QueryRunner;
  readonly target: string;

  constructor(connection: Connection, entity: string) {
    this.queryRunner = connection.createQueryRunner();
    this.manager = this.queryRunner.manager;
    this.target = entity;
  }

  hasId(entity: Entity): boolean {
    return this.manager.hasId(entity);
  }

  getId(entity: Entity): any {
    return this.manager.getId(entity);
  }

  create(): Entity;

  create(entityLikeArray: DeepPartial<Entity>[]): Entity[];

  create(entityLike: DeepPartial<Entity>): Entity;

  create(
    plainEntityLikeOrPlainEntityLikes?:
      | DeepPartial<Entity>
      | DeepPartial<Entity>[],
  ): Entity | Entity[] {
    return this.manager.create<any>(
      this.target as any,
      plainEntityLikeOrPlainEntityLikes as any,
    );
  }

  merge(
    mergeIntoEntity: Entity,
    ...entityLikes: DeepPartial<Entity>[]
  ): Entity {
    return this.manager.merge(
      this.target as any,
      mergeIntoEntity,
      ...entityLikes,
    );
  }

  preload(entityLike: DeepPartial<Entity>): Promise<Entity | undefined> {
    return this.manager.preload(this.target as any, entityLike);
  }

  save<T extends DeepPartial<Entity>>(
    entities: T[],
    options: SaveOptions & { reload: false },
  ): Promise<T[]>;

  save<T extends DeepPartial<Entity>>(
    entities: T[],
    options?: SaveOptions,
  ): Promise<(T & Entity)[]>;

  save<T extends DeepPartial<Entity>>(
    entity: T,
    options: SaveOptions & { reload: false },
  ): Promise<T>;

  save<T extends DeepPartial<Entity>>(
    entity: T,
    options?: SaveOptions,
  ): Promise<T & Entity>;

  save<T extends DeepPartial<Entity>>(
    entityOrEntities: T | T[],
    options?: SaveOptions,
  ): Promise<T | T[]> {
    return this.manager.save<T>(
      this.target as any,
      entityOrEntities as any,
      options,
    );
  }

  remove(entities: Entity[], options?: RemoveOptions): Promise<Entity[]>;

  remove(entity: Entity, options?: RemoveOptions): Promise<Entity>;

  remove(
    entityOrEntities: Entity | Entity[],
    options?: RemoveOptions,
  ): Promise<Entity | Entity[]> {
    return this.manager.remove(
      this.target as any,
      entityOrEntities as any,
      options,
    );
  }

  softRemove<T extends DeepPartial<Entity>>(
    entities: T[],
    options: SaveOptions & { reload: false },
  ): Promise<T[]>;

  softRemove<T extends DeepPartial<Entity>>(
    entities: T[],
    options?: SaveOptions,
  ): Promise<(T & Entity)[]>;

  softRemove<T extends DeepPartial<Entity>>(
    entity: T,
    options: SaveOptions & { reload: false },
  ): Promise<T>;

  softRemove<T extends DeepPartial<Entity>>(
    entity: T,
    options?: SaveOptions,
  ): Promise<T & Entity>;

  softRemove<T extends DeepPartial<Entity>>(
    entityOrEntities: T | T[],
    options?: SaveOptions,
  ): Promise<T | T[]> {
    return this.manager.softRemove<T>(
      this.target as any,
      entityOrEntities as any,
      options,
    );
  }

  recover<T extends DeepPartial<Entity>>(
    entities: T[],
    options: SaveOptions & { reload: false },
  ): Promise<T[]>;

  recover<T extends DeepPartial<Entity>>(
    entities: T[],
    options?: SaveOptions,
  ): Promise<(T & Entity)[]>;

  recover<T extends DeepPartial<Entity>>(
    entity: T,
    options: SaveOptions & { reload: false },
  ): Promise<T>;

  recover<T extends DeepPartial<Entity>>(
    entity: T,
    options?: SaveOptions,
  ): Promise<T & Entity>;

  recover<T extends DeepPartial<Entity>>(
    entityOrEntities: T | T[],
    options?: SaveOptions,
  ): Promise<T | T[]> {
    return this.manager.recover<T>(
      this.target as any,
      entityOrEntities as any,
      options,
    );
  }

  insert(
    entity: QueryDeepPartialEntity<Entity> | QueryDeepPartialEntity<Entity>[],
  ): Promise<InsertResult> {
    return this.manager.insert(this.target as any, entity);
  }

  update(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindConditions<Entity>,
    partialEntity: QueryDeepPartialEntity<Entity>,
  ): Promise<UpdateResult> {
    return this.manager.update(
      this.target as any,
      criteria as any,
      partialEntity,
    );
  }

  delete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindConditions<Entity>,
  ): Promise<DeleteResult> {
    return this.manager.delete(this.target as any, criteria as any);
  }

  softDelete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindConditions<Entity>,
  ): Promise<UpdateResult> {
    return this.manager.softDelete(this.target as any, criteria as any);
  }

  restore(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindConditions<Entity>,
  ): Promise<UpdateResult> {
    return this.manager.restore(this.target as any, criteria as any);
  }

  count(options?: FindManyOptions<Entity>): Promise<number>;

  count(conditions?: FindConditions<Entity>): Promise<number>;

  count(
    optionsOrConditions?: FindManyOptions<Entity> | FindConditions<Entity>,
  ): Promise<number> {
    return this.manager.count(this.target as any, optionsOrConditions as any);
  }

  find(options?: FindManyOptions<Entity>): Promise<Entity[]>;

  find(conditions?: FindConditions<Entity>): Promise<Entity[]>;

  find(
    optionsOrConditions?: FindManyOptions<Entity> | FindConditions<Entity>,
  ): Promise<Entity[]> {
    return this.manager.find(this.target as any, optionsOrConditions as any);
  }

  findAndCount(options?: FindManyOptions<Entity>): Promise<[Entity[], number]>;

  findAndCount(
    conditions?: FindConditions<Entity>,
  ): Promise<[Entity[], number]>;

  findAndCount(
    optionsOrConditions?: FindManyOptions<Entity> | FindConditions<Entity>,
  ): Promise<[Entity[], number]> {
    return this.manager.findAndCount(
      this.target as any,
      optionsOrConditions as any,
    );
  }

  findByIds(ids: any[], options?: FindManyOptions<Entity>): Promise<Entity[]>;

  findByIds(ids: any[], conditions?: FindConditions<Entity>): Promise<Entity[]>;

  findByIds(
    ids: any[],
    optionsOrConditions?: FindManyOptions<Entity> | FindConditions<Entity>,
  ): Promise<Entity[]> {
    return this.manager.findByIds(
      this.target as any,
      ids,
      optionsOrConditions as any,
    );
  }

  findOne(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity | undefined>;

  findOne(options?: FindOneOptions<Entity>): Promise<Entity | undefined>;

  findOne(
    conditions?: FindConditions<Entity>,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity | undefined>;

  findOne(
    optionsOrConditions?:
      | string
      | number
      | Date
      | ObjectID
      | FindOneOptions<Entity>
      | FindConditions<Entity>,
    maybeOptions?: FindOneOptions<Entity>,
  ): Promise<Entity | undefined> {
    return this.manager.findOne(
      this.target as any,
      optionsOrConditions as any,
      maybeOptions,
    );
  }

  findOneOrFail(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity>;

  findOneOrFail(options?: FindOneOptions<Entity>): Promise<Entity>;

  findOneOrFail(
    conditions?: FindConditions<Entity>,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity>;

  findOneOrFail(
    optionsOrConditions?:
      | string
      | number
      | Date
      | ObjectID
      | FindOneOptions<Entity>
      | FindConditions<Entity>,
    maybeOptions?: FindOneOptions<Entity>,
  ): Promise<Entity> {
    return this.manager.findOneOrFail(
      this.target as any,
      optionsOrConditions as any,
      maybeOptions,
    );
  }

  query(query: string, parameters?: any[]): Promise<any> {
    return this.manager.query(query, parameters);
  }

  clear(): Promise<void> {
    return this.manager.clear(this.target);
  }

  increment(
    conditions: FindConditions<Entity>,
    propertyPath: string,
    value: number | string,
  ): Promise<UpdateResult> {
    return this.manager.increment(this.target, conditions, propertyPath, value);
  }

  decrement(
    conditions: FindConditions<Entity>,
    propertyPath: string,
    value: number | string,
  ): Promise<UpdateResult> {
    return this.manager.decrement(this.target, conditions, propertyPath, value);
  }
}
