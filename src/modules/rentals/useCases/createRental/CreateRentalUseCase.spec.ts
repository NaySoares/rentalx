import dayjs from 'dayjs';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/Implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create rental', () => {
  const dayAdd24Hours = dayjs().add(2, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
    );
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12313',
      car_id: '121212',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it(
    'should not be able to create a new rental if there is another open to the same user',
    async () => {
      expect(async () => {
        await createRentalUseCase.execute({
          user_id: '12313',
          car_id: '121212',
          expected_return_date: dayAdd24Hours,
        });

        await createRentalUseCase.execute({
          user_id: '12313',
          car_id: '111111',
          expected_return_date: dayAdd24Hours,
        });
      }).rejects.toBeInstanceOf(AppError);
    },
  );

  it(
    'should not be able to create a new rental if there is another open to the same car',
    async () => {
      expect(async () => {
        await createRentalUseCase.execute({
          user_id: '8888',
          car_id: '1111',
          expected_return_date: dayAdd24Hours,
        });

        await createRentalUseCase.execute({
          user_id: '21213',
          car_id: '1111',
          expected_return_date: dayAdd24Hours,
        });
      }).rejects.toBeInstanceOf(AppError);
    },
  );

  it('should not be able to create a new rental with invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12312',
        car_id: '3333',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
