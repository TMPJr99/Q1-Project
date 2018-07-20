var word = document.querySelector('input[name=word]')
var search = document.querySelector('button[name=button]')
var box = document.querySelector('.box')

search.addEventListener('click', function() {
  box.innerHTML = ''
  fetch(`https://api.datamuse.com/words?sl=${word.value}&md=dpr`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data)
      box.innerHTML += `<p>Part of Speech: "${data[0].tags[0]}"</p>`
      box.innerHTML += `<p>Defininitions: ${data[0].defs[0].substr(data[0].defs[0].indexOf(" ")+1)}, <BR/>or<BR/> ${data[0].defs[1].substr(data[0].defs[1].indexOf(" ")+1)}</p>`
      box.innerHTML += `<p>Pronunciation: "${data[0].tags[data[0].tags.length - 1].slice(5)}"</p>`
    })
    .catch(err => {
      console.log(err)
      box.innerHTML += `<p>No Definition Provided`
    })
})

window.addEventListener('keypress', function(e) {
  var key = e.keyCode;
  if (key === 13) {
    box.innerHTML = ''
    fetch(`https://api.datamuse.com/words?sp=${word.value}&md=dpr`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        box.innerHTML += `<p>Part of Speech: "${data[0].tags[0]}"</p>`
        box.innerHTML += `<p>Defininitions: ${data[0].defs[0].slice(2)}, <BR/>or<BR/> ${data[0].defs[1].slice(2)}</p>`
        box.innerHTML += `<p>Pronunciation: "${data[0].tags[data[0].tags.length - 1].slice(5)}"</p>`
      })
      .catch(err => {
        console.log(err)
        box.innerHTML += `<p>No Definition Provided`
      })
  }
})
