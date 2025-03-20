const UserRepository = require('../../domain/UserRepository')
const User = require('../../domain/User')

class SqliteUserRepository extends UserRepository {
  constructor(db) {
    super()
    this.db = db
  }

  async findByUsername(username) {
    return new Promise((resolve, reject) => {
      this.db.get(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (err, row) => {
          if (err) return reject(err)
          resolve(row ? new User(row.id, row.username, row.password) : null)
        }
      )
    })
  }
}

module.exports = SqliteUserRepository