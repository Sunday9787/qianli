import { Test, TestingModule } from '@nestjs/testing'
import { DetailController } from './detail.controller'

describe('DetailController', () => {
  let controller: DetailController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailController]
    }).compile()

    controller = module.get<DetailController>(DetailController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
