import { LayoutService } from '@/layout/layout.service'
import { Injectable } from '@nestjs/common'
import yaml from 'js-yaml'
import path from 'path'
import fs from 'fs'
import { PostEntity } from './post.entity'

const projectRoot = path.join(process.cwd(), '..', '..')
const postYaml = fs.readFileSync(path.join(projectRoot, '/services/backend/data/post.yaml'), { encoding: 'utf-8' })
const posts = (yaml.load(postYaml) as { post: PostEntity[] }).post

const postMap: Map<number, PostEntity> = new Map(
  posts.map(function (item, index) {
    return [index, item]
  })
)

@Injectable()
export class PostService {
  constructor(private layoutService: LayoutService) {}

  data(id: number) {
    return {
      layout: this.layoutService.layout(),
      post: postMap.get(id),
      recommends: this.all().filter(item => item.id !== id)
    }
  }

  all() {
    return Array.from(postMap.values())
  }
}
