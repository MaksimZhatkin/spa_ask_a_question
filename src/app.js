import {Question} from './questions.js'
import './style.css'
import {isValid} from './utils.js'

// Documents's Elements
const form = document.querySelector('#form')
const input = form.querySelector('#question-input')
const btn = form.querySelector('#submit')

// Events
window.addEventListener('load', Question.renderList)
form.addEventListener('submit', formHandler)
input.addEventListener('input', () => {
		btn.disabled = !isValid(input.value)
})


function formHandler(event) {
		event.preventDefault()
		if (isValid(input.value)) {
				const question = {
						text: input.value.trim(),
						date: new Date().toJSON(),
				}

				// Async request to server to save question
				Question.create(question)
						.then(() => {
								input.value = ''
								btn.disabled = true
						})
		}
}
