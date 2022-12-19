/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/


import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'UsuariosController.store')
  Route.post('/login', 'UsuariosController.login')
}).prefix('usuario')

Route.group(() => {
  Route.get('/', 'ClientesController.index')
  Route.post('/', 'ClientesController.store')

  Route.get('/:id/:mes?/:ano?', 'ClientesController.show')
  Route.put('/:id', 'ClientesController.update')
  Route.delete('/:id', 'ClientesController.destroy')
}).prefix('cliente').middleware('auth')

Route.group(() => {
  Route.get('/', 'LivrosController.index')
  Route.post('/', 'LivrosController.store')

  Route.get('/:id', 'LivrosController.show')
  Route.put('/:id', 'LivrosController.update')
  Route.delete('/:id', 'LivrosController.destroy')
}).prefix('livro').middleware('auth')

Route.post('venda', 'VendasController.store').middleware('auth')

