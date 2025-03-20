class AuthService {
    constructor(userRepository) {
      this.userRepository = userRepository
    }
  
    async authenticate(username, password) {
      const user = await this.userRepository.findByUsername(username)
      if (!user || !user.validatePassword(password)) {
        throw new Error('Invalid credentials')
      }
      return user
    }
  }
  
  module.exports = AuthService