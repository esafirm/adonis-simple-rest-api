'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route');
const Car = use('App/Models/Car');

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' };
});

Route.group(() => {
  Route.get('/cars', async () => {
    return await Car.all();
  });

  Route.post('/cars', async ({ request }) => {
    const parameter = request.only(['name', 'type']);

    const newCar = new Car();
    newCar.name = parameter.name;
    newCar.type = parameter.type;

    await newCar.save();

    return newCar;
  });

  Route.post('/cars/:id', async ({ params, request }) => {
    const parameter = request.only(['name', 'type']);

    const car = await Car.find(params.id);
    if (!car) {
      return response.status(404).json({ message: 'Car not found' });
    }

    car.name = parameter.name;
    car.type = parameter.type;

    await car.save();

    return car;
  });

  Route.delete('/cars/:id', async ({ params, request, response }) => {
    const car = await Car.find(params.id);
    if (!car) {
      return response.status(404).json({ message: 'Car not found' });
    }
    await car.delete();
    return response.status(200).json({ message: 'Car deleted!' });
  });
}).prefix('/v1');

Route.group(() => {
  Route.get('/hello', () => ({
    greeting: 'This is the real hello world'
  }));
  Route.post('/hello', () => ({
    greeting: 'Hello from POST'
  }));
}).prefix('test');

Route.group(() => {
  Route.get('books', 'BookController.index');
  Route.get('books/:id', 'BookController.show');
  Route.post('books', 'BookController.store');
  Route.post('books/:id', 'BookController.update');
  Route.delete('books/:id', 'BookController.delete');
}).prefix('api/v1');
