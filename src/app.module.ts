import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './infrastructure/ioc/product.module';
import { setEnvironment} from './infrastructure/environments';

@Module({
  imports: [
    ProductModule,
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
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: setEnvironment(),
    }),
  ],
  controllers: [],
  providers: [ ],
})

export class AppModule {}
