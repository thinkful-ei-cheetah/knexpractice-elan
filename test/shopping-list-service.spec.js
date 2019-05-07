require('dotenv').config()
const { expect } = require('chai')
const supertest = require('supertest')
const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe(`Shopping list service object`, () => {
  describe(`Shopping list service object`, () => {
    let db
    let testShoppingList = [
      {
        id: 1,
        name: 'Test item',
        price: "13.10",
        date_added: new Date('2029-01-22T16:28:32.615Z'),
        checked: false,
        category: 'Main'
      },
      {
        id: 2,
        name: 'Test item',
        price: "9.10",
        date_added: new Date('2029-01-22T16:28:32.615Z'),
        checked: false,
        category: 'Main'
      },
      {
        id: 3,
        name: 'Test item',
        price: "8.10",
        date_added: new Date('2029-01-22T16:28:32.615Z'),
        checked: true,
        category: 'Lunch'
      }]

      before(() => {
        db = knex({
          client: 'pg',
          connection: process.env.TEST_DB_URL
        })
      })

      before(() => db('shopping_list').truncate())

      afterEach(() => db('shopping_list').truncate())

      after(() => db.destroy())

    context(`Given 'shopping_list' has data`, () => {
      beforeEach(() => {
        return db
          .into('shopping_list')
          .insert(testShoppingList)
      })

      it(`getAllArticles() resolves all articles from 'shopping_list' table`, () => {
        return ShoppingListService.getAllItems(db)
        .then(actual => expect(actual).to.eql(testShoppingList))
      })

      it(`getById() resolves a shopping list item's id from 'shopping_list' table`, () => {
        const firstId = 1
        const firstTestItem = testShoppingList[firstId -1]
        return ShoppingListService.getById(db, firstId)
          .then(actual => {
            expect(actual).to.eql({
              id: firstId,
              name: firstTestItem.name,
              checked: firstTestItem.checked,
              price: firstTestItem.price,
              category: firstTestItem.category,
              date_added: firstTestItem.date_added
          })
        })
      })

      it(`deleteArticle() deletes an item based on its id from 'shopping_list' table`, () => {
        const itemId = 1
        return ShoppingListService.deleteItem(db, itemId)
          .then(() => ShoppingListService.getAllItems(db))
          .then(allArticles => {
            const expected = testShoppingList.filter(item => item.id !== itemId)
          expect(allArticles).to.eql(expected)
          })
        })

      it(`updateItem() updates an item from 'shopping_list' table`, () => {
        const idToUpdate = 1
        const newItemInfo = {
          id: idToUpdate,
          name: 'updated name',
          checked: true,
          price: "5.80",
          category: "Main",
          date_added: new Date('2029-01-22T16:28:32.615Z'),
        }
        return ShoppingListService.updateItem(db, idToUpdate, newItemInfo)
          .then(() => ShoppingListService.getById(db, idToUpdate))
          .then(newItem => {
            expect(newItem).to.eql(newItemInfo)
          })
        })
      })

      context(`Given 'shopping_list' has no data`, () => {
        it(`getAllArticles() resolves an empty array`, () => {
          return ShoppingListService.getAllItems(db)
            .then(actual => {
              expect(actual).to.eql([])
          })
        })
        it(`addItem() adds a new item to the 'shopping_list' table with an 'id'`, () => {
          const newItem = {
            id: 1,
            name: 'updated name',
            checked: true,
            price: "5.80",
            category: "Main",
            date_added: new Date('2029-01-22T16:28:32.615Z'),
          }
          return ShoppingListService.addItem(db, newItem) 
            .then(actual => {
              expect(actual).to.eql({
                id: newItem.id,
                name: newItem.name,
                checked: newItem.checked,
                price: newItem.price,
                category: newItem.category,
                date_added: newItem.date_added
            })
          })
        })
    })
  })
})