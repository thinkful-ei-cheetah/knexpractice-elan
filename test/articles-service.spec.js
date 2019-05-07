require('dotenv').config()
const { expect } = require('chai')
const supertest = require('supertest')
const ArticlesService = require('../src/articles-service')
const knex = require('knex')

describe(`Articles service object`, () => {
  let db 

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
  })
  describe(`getArticles()`, () => {
    it(`resolves all articles from 'blogful_articles' table`, () => {
      expect(true).to.eql(false)
    })
  })
})
