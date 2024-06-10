import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/todo_db') , TodosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
