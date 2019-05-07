require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})

function getAllTextItems(searchTerm) {
  knexInstance('shopping_list')
    .select('*')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => console.log(result))
}

// getAllTextItems('pi');

function paginateAllItems(pageNumber) {
  const productsPerPage = 6;
  const offset = productsPerPage * (pageNumber -1)
  knexInstance('shopping_list')
    .select('*')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => console.log(result))
}

// paginateAllItems(1);

function getItemsAfterDate(daysAgo) {
  knexInstance('shopping_list')
    .select('*')
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() -'?? days'::INTERVAL`, daysAgo)
    )
    .orderBy('name', 'ASC')
    .then(result => console.log(result))
}

function getCostForAllCategories() {
  knexInstance('shopping_list')
    .select('category')
    .sum('price')
    .groupBy('category')
    .debug()
    .then(result => console.log(result))
}

getCostForAllCategories()