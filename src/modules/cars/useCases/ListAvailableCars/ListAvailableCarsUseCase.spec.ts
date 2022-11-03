import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('Should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi A1',
      description: 'car description',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 60,
      brand: 'Car brand',
      category_id: 'eeeeeee-asdas-2312-asdas',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi A1',
      description: 'car description',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 60,
      brand: 'Car_brand_test',
      category_id: 'eeeeeee-asdas-2312-asdas',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Car_brand_test',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi A1',
      description: 'car description',
      daily_rate: 110.0,
      license_plate: 'DEF-1224',
      fine_amount: 60,
      brand: 'Car_brand_test',
      category_id: 'eeeeeee-asdas-2312-asdas',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Audi A1',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi A1',
      description: 'car description',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 60,
      brand: 'Car_brand_test',
      category_id: 'eavs',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'eavs',
    });

    expect(cars).toEqual([car]);
  });
});
