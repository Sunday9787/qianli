import { Test, TestingModule } from '@nestjs/testing'
import { LayoutController } from './layout.controller'

describe('LayoutController', () => {
  let controller: LayoutController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LayoutController]
    }).compile()

    controller = module.get<LayoutController>(LayoutController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
