const ShoppingListService = {
  getAllItems(knex) {
    return knex('shopping_list')
      .select('*')    
  },
  getById(knex, id) {
    return knex('shopping_list')
      .select('*')
      .where('id', id)
      .first()
  },
  addItem(knex, item) {
    return knex
      .insert(item)
      .into('shopping_list')
      .returning('*')
      .then(rows => rows[0])
  },
  updateItem(knex, id, newItem) {
    return knex('shopping_list')
      .select('*')
      .where('id', id)
      .update(newItem)
  },
  deleteItem(knex, id) {
    return knex('shopping_list')
      .select('*')
      .where('id', id)
      .del()
  }
}

module.exports = ShoppingListService 