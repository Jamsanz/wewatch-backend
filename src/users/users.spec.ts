import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {

    const users: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService]
    }).compile();

    usersController = users.get<UsersController>(UsersController);
    usersService = users.get<UsersService>(UsersService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const results = [
        {
          _id: 1,
          firstName: 'Jane',
          lastName: 'Doe',
          address: '505 Wall St',
          phone: '505 236 775',
          profileImg: 'placeholder',
          email: 'janeDoe@gmail.com',
          password: 'password123',
        },
        {
          _id: 2,
          firstName: 'John',
          lastName: 'Doe',
          address: '505 Wall St',
          phone: '505 236 775',
          profileImg: 'placeholder',
          email: 'johnDoe@gmail.com',
          password: 'password123',
        },
      ];
      jest
        .spyOn(usersService, 'findAll')
        .mockImplementation(async () => results);
      expect(await usersController.getUsers()).toBe(results);
    });
  });
});
