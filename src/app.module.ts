import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './infrastructure/ioc/customer.module';
import { ProductModule } from './infrastructure/ioc/product.module';
import { setEnvironment} from './infrastructure/environments';

@Module({
  imports: [
    CustomerModule,
    ProductModule,
    TypeOrmModule.forRoot(),
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
