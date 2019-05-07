const ArticlesService = {
  getAllArticles(knex) {
    return knex('blogful_articles').select('*')
  },
  insertArticle(knex, article) {
    return knex
      .insert(article)
      .into('blogful_articles')
      .returning('*')
      .then(rows => rows[0])
  },
  getById(knex, id) {
    return knex('blogful_articles')
      .select('*')
      .where('id', id)
      .first()
  },
  deleteArticle(knex, id) {
    return knex('blogful_articles')
    .where('id', id)
    .del()
  },
  updateArticle(knex, id, newArticle) {
    return knex('blogful_articles')
      .where('id', id)
      .update(newArticle)
  }
}

module.exports = ArticlesService