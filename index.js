



var TTS = require('./lib/TTS')

var transform = function (iso) {
  var parts = iso.split(/\/|\ |\:/)
  console.log(parts)

  var day   = parts[0]
  var month = parts[1]
  var year  = parts[2]

  var hour  = parts[3]
  var min   = parts[4]
  var sec   = parts[5]

  var months = {
      '01': 'janvier'
    , '02': 'février'
    , '03': 'mars'
    , '04': 'avril'
    , '05': 'may'
    , '06': 'juin'
    , '07': 'juillet'
    , '08': 'aout'
    , '09': 'septembre'
    , '10': 'octobre'
    , '11': 'novembre'
    , '12': 'décembre'
  }

  return `Nous sommes le ${day} ${months[month]}, il est ${hour} heure ${min}`
}

var check = function () {
  var now = new Date().toLocaleString('fr')

  console.log(now)
  if (now.substring(now.length - 2) !== '00') {
    return
  }

  var text = transform(now)

  TTS.say(text)
    .catch(function (error) {
      console.log(error)
    })
}

var to = function () {
  check()

  setTimeout(function () {
    to()
  }, 1000)
}

to()