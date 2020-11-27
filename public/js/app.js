// import { response } from "express"

console.log('Hello!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const para1 = document.querySelector('#para1')
const para2 = document.querySelector('#para2')

weatherForm.addEventListener('submit', (e) => {
    //code to prevent refresh
    e.preventDefault()
    para1.textContent = 'Loading...'
    para2.textContent=''
    fetch('/weather?address=' + search.value).then((Response) => {
        Response.json().then((data) => {
            if (!data.error) {
                // console.log(data.location)
                // console.log(data.forecast)
                para1.textContent=data.location
                para2.textContent=data.forecast
            }
            else
                // console.log(data.error)                
                para1.textContent = data.error
        })
    })
})