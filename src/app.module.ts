import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './infrastructure/ioc/product.module';
import { ResultModule } from './result/result.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "127.0.0.1",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "bye_paper",
      synchronize: true,
      logging: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}']
    }),
    ProductModule,
    ResultModule,
  ],
  controllers: [],
  providers: [ ],
})
export class AppModule {}
