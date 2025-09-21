import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/posts.schema';
import { PostMongooseRepository } from './repository/mongoose/post.mongoose.repository';
import { PostRepository } from './repository/post.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    AuthModule,
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    { provide: PostRepository, useClass: PostMongooseRepository },
  ],
})
export class PostsModule {}
