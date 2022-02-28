import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Coffee } from '../../entities/coffee/coffee.entity';
import { Flavor } from '../../entities/flavors/flavor.entity';
import { Connection, Repository } from 'typeorm';
import { CoffeeService } from './coffee.service';
import { type } from 'os';
import { doesNotMatch } from 'assert';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('CoffeeService', () => {
  let service: CoffeeService;
  let coffeRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeeService,
        {provide: Connection, useValue: {}},
        {provide: getRepositoryToken(Flavor), useValue: createMockRepository()},
        {provide: getRepositoryToken(Coffee), useValue: createMockRepository()}
      ],
    }).compile();

    service = module.get<CoffeeService>(CoffeeService);
    coffeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a coffee object', async () => {
      const coffeId = '1';
      const expectedCoffe = {};

      coffeRepository.findOne.mockReturnValue(expectedCoffe);
      const coffee = await service.findOne(coffeId);
      expect(coffee).toEqual(expectedCoffe);
    });
  });
});
