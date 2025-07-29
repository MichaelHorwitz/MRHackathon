import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

const mockUser = {
  id: 1,
  email: 'test@example.com',
  password: 'hashedPassword',
  name: 'Test User',
};

const createDto = {
  email: 'test@example.com',
  password: 'plainPassword',
};

const updateDto = {
  email: 'updated@example.com',
  password: 'newPassword',
};

describe('UserService', () => {
  let service: UserService;
  let repo: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get(getRepositoryToken(User));
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      repo.find.mockResolvedValue([mockUser]);
      const result = await service.findAll();
      expect(result).toEqual([mockUser]);
      expect(repo.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      repo.findOneBy.mockResolvedValue(mockUser);
      const result = await service.findOne(1);
      expect(result).toEqual(mockUser);
      expect(repo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('findOneByEmail', () => {
    it('should return a user by email', async () => {
      repo.findOneBy.mockResolvedValue(mockUser);
      const result = await service.findOneByEmail('test@example.com');
      expect(result).toEqual(mockUser);
      expect(repo.findOneBy).toHaveBeenCalledWith({ email: 'test@example.com' });
    });
  });

  describe('create', () => {
    
  });

  describe('update', () => {
    
  });

  describe('remove', () => {
    it('should call delete with given id', async () => {
      repo.delete.mockResolvedValue({ affected: 1 } as any);
      await service.remove(1);
      expect(repo.delete).toHaveBeenCalledWith(1);
    });
  });
});
