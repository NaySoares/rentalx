import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create  car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('Should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Fake Car ',
      description: 'A new description',
      daily_rate: 200.00,
      license_plate: 'XD2XD',
      fine_amount: 999,
      brand: 'brand',
      category_id: 'randomId',
    });

    expect(car).toHaveProperty('id');
  });

  it('Should not be able to create a new car with a plate existent', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Fake Car',
        description: 'A new description',
        daily_rate: 200.00,
        license_plate: 'XD2XD',
        fine_amount: 999,
        brand: 'brand',
        category_id: 'randomId',
      });

      await createCarUseCase.execute({
        name: 'Fake Car 2',
        description: 'A new description',
        daily_rate: 200.00,
        license_plate: 'XD2XD',
        fine_amount: 999,
        brand: 'brand',
        category_id: 'randomId',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Fake Car Available',
      description: 'A new description',
      daily_rate: 200.00,
      license_plate: 'XD12XD',
      fine_amount: 999,
      brand: 'brand',
      category_id: 'randomId',
    });

    expect(car.available).toBe(true);
  });
});
