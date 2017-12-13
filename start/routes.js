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

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' };
});

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
}).prefix('api/v1');
