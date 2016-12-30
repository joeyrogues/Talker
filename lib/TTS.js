



var googleTTS = require('google-tts-api')
var path      = require('path')

var Utils     = require('./Utils')
var Player    = require('./Player')

var fs = require('fs');

var CACHE_DIR = './tts_cache/'

var TTS = {
  _fetch: function (text, dest) {
    console.log(`Download started  [${text}]`)

    return googleTTS(text, 'fr', 1)
      .then(function (url) {
        console.log(`Download finished [${text}]`)

        return Utils.downloadFile(url, dest)
          .then(nothing => dest)
      })
  },

  say: function (text) {
    if (!text) {
      return Promise.reject(new Error('TTS::say(text) - Missing parameters (text)'))
    }

    var dest = CACHE_DIR + text.replace(' ', '_') + '.mp3'

    var p = Promise.resolve(dest)
    if (!fs.existsSync(dest)) {
      p = p.then(ignored => this._fetch(text, dest))
    }

    return p
      .then(dest => Player.play(dest))
      .then(ignored => undefined)
  },

  sayMany: function (arrayOfText) {
    if (!arrayOfText) {
      return Promise.reject(new Error('TTS::sayMany(arrayOfText) - Missing parameters (arrayOfText)'))
    }

    var that = this
    var p = Promise.resolve()

    arrayOfText.reduce(
      (memo, text) => memo.then(
        nothing => this.say(text)
      )
      , Promise.resolve()
    )

    return p
  }
}

module.exports = TTS