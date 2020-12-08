// scheme-model
const db = require('../data/db-config');

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
}

// - `find()`:
//   - Calling find returns a promise that resolves to an array of all schemes in the database.
//   - No steps are included.
function find() {
  return db('schemes');
}

// - `findById(id)`:
//   - Expects a scheme `id` as its only parameter.
//   - Resolve to a _single_ scheme object.
//   - On an invalid `id`, resolves to `null`, perhaps by doing `if (!schemaObject) return Promise.resolve(null)`.
function findById(id) {
  return db('schemes')
    .where({id})
    .then(data => {
      if (!data) {
        return Promise.resolve(null);
      } else {
        return Promise.resolve(data);
      }
    })
}

// - `findSteps(id)`:
//   - Expects a scheme `id`.
//   - Resolves to an array of all correctly ordered step for the given scheme: `[ { id: 17, scheme_name: 'Find the Holy Grail', step_number: 1, instructions: 'quest'}, { id: 18, scheme_name: 'Find the Holy Grail', step_number: 2, instructions: '...and quest'}, etc. ]`.
//   - This array should include the `scheme_name` _not_ the `scheme_id`.
function findSteps(id) {
  return db('steps.id', 'steps.instructions', 'steps.step_number', 'schemes.scheme_name')
    .join('schemes', 'steps.schemes_id', 'schemes.id')
    .where('scheme.id' === id).orderBy('step_number')
}

// - `add(scheme)`:
//   - Expects a scheme object.
//   - Inserts scheme into the database.
//   - Resolves to the newly inserted scheme, including `id`.
function add(scheme) {
  return db('schemes')
    .insert(scheme)
    .then(id => {
      return findById(id);
    })
}

// - `update(changes, id)`:
//   - Expects a changes object and an `id`.
//   - Updates the scheme with the given id.
//   - Resolves to the newly updated scheme object.
function update(id, changes) {
  findById(id).update(changes)
  return findById(id);
}

// - `remove(id)`:
//   - Removes the scheme object with the provided id.
//   - Resolves to the removed scheme
//   - Resolves to `null` on an invalid id.
//   - (Hint: Only worry about removing the `scheme`. The database is configured to automatically remove all associated steps.)

function remove(id) {
  const removed = findById(id);
  return db('schemes')
  .where({id})
  .then(data => {
    if (!data) {
      return Promise.resolve(null);
    } else {
      return Promise.resolve(removed);
    }
  })
}