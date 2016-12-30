



var urlParse  = require('url').parse
var fs        = require('fs')
var http      = require('http')
var https     = require('https')

module.exports = {
  downloadFile: function (url, dest) {
    return new Promise(function (resolve, reject) {
      var info = urlParse(url)
      var httpClient = info.protocol === 'https:' ? https : http
      var options = {
        host: info.host,
        path: info.path,
        headers: {
          'user-agent': 'WHAT_EVER'
        }
      }

      httpClient.get(options, function (res) {
        if (res.statusCode !== 200) {
          return reject(new Error('request to ' + url + ' failed, status code = ' + res.statusCode + ' (' + res.statusMessage + ')'))
        }

        var file = fs.createWriteStream(dest)

        file.on('finish', nothing => file.close(resolve))

        file.on('error', function (err) {
          fs.unlink(dest)
          reject(err)
        })

        res.pipe(file)
      })
      .on('error', err => reject(err))
      .end()
    })
  }
}
