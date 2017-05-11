export default {
  // Functions return fixtures
  getRoot: () => {
    return {
      ok: true,
      data: require('../Fixtures/root.json')
    }
  },
  getRate: () => {
    return {
      ok: true,
      data: require('../Fixtures/rateLimit.json')
    }
  },
  getUser: (username) => {
    // This fixture only supports gantman or else returns skellock
    const gantmanData = require('../Fixtures/gantman.json')
    const skellockData = require('../Fixtures/skellock.json')
    return {
      ok: true,
      data: username.toLowerCase() === 'gantman' ? gantmanData : skellockData
    }
  },
  createTodo: todo => {
    if (!todo.text) {
      return Promise.resolve({
        ok: false, 
        data: {message: 'Informe a descrição'}
      })
    }

    return Promise.resolve({
      data: {...todo, id: Date.now()},
      ok: true
    })
  },
  updateTodo: todo => Promise.resolve({ok: true, data: todo}),
  removeTodo: () => Promise.resolve({ok: true}),
  fetchTodos: () => Promise.resolve({
    ok: true,
    data: [
      {id: 1, text: 'Comprar Cerverja', done: true},
      {id: 2, text: 'Comprar carne', done: false},
      {id: 3, text: 'Fazer churrasco', done: false}
    ]
  }) 
}
