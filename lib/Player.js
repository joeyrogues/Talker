



var mpg321    = require('mpg321')

var Player = {
  play: function (dest) {
    return new Promise(function (resolve, reject) {
      if (!dest) {
        reject('Player::play(dest) - Missing parameters (dest)')
      }

      mpg321()
        .loop(1)
        .file(dest)
        .exec(function (error) {
          if (!!error) {
            reject(error)
          }

          resolve(dest)
        })
    })
  }
}

module.exports = Player