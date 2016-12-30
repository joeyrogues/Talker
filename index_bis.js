//var say = require('say')

// Use default system voice and speed
//say.speak('My program is fucking awesome')

// Nous commencons par inclure les librairies que nous avons installées.
var querystring = require('querystring')
var mpg321      = require('mpg321')
var request     = require("request")

/*var text = "Bonjour"

var result = querystring.stringify({
  tl: "fr",
  q:  text,
  ie: "UTF-8"
})

console.log(result)

proc = mpg321()
.loop(1)
.file('http://translate.google.com/translate_tts?'+ result)
.exec()
*/

var googleTTS = require('google-tts-api')

googleTTS('Bonjour les gars', 'fr', 1)
.then(function (url) {
  console.log(url)

  mpg321()
    .loop(1)
    .file(url)
    .exec()
})
.catch(function (err) {
  console.error(err.stack)
})