console.log('Client side javascript file is loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// }) 

//http://localhost:3000/weather?address=Santa%20Clara


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageLine = document.querySelector('#message-1')

messageLine.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    fetch('/weather?address='+ location).then((response) => {
    response.json().then((data) => {

            if (data.error){
                console.log(data.error)
            } else {
                messageLine.textContent = 'The weather in ' + location + ' is ' + data.temp + ' degrees and  ' + data.perc + ' chance of rain' 
            }
        
        })
    })

    console.log(location)
})