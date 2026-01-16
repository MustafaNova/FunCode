import { Test, TestingModule } from '@nestjs/testing';
import { UserRepositoryAdapter } from './user-repository.adapter';

describe('UserRepositoryAdapter', () => {
  let service: UserRepositoryAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepositoryAdapter],
    }).compile();

    service = module.get<UserRepositoryAdapter>(UserRepositoryAdapter);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
