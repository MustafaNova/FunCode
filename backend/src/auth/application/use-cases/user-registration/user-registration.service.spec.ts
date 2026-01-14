import { Test, TestingModule } from '@nestjs/testing';
import { UserRegistrationService } from './user-registration.service';

describe('UserRegistrationService', () => {
  let service: UserRegistrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRegistrationService],
    }).compile();

    service = module.get<UserRegistrationService>(UserRegistrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
