import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [EmployeeModule, GraphQLModule.forRoot(
    {
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }
  ),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_nest',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true

    }),
    ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
