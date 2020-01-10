export class Question {
		static create(question) {
				return fetch('https://ask-for-me-b6bf0.firebaseio.com/questions.json', {
						method: 'POST',
						body: JSON.stringify(question),
						headers: {
								'Content-Type': 'application/json'
						}
				})
						.then(response => response.json())
						.then(response => {
								question.id = response.name
								return question
						})
						.then(addToLocalStorage)
						.then(Question.renderList)
		}

		static renderList() {
				const questions = getParsedQuestions()
				let html = questions.length ? questions.map(toCard).join('')
																																: ` `

				const tableList = document.querySelector('.list')

				tableList.insertAdjacentHTML('beforeend', html)
		}
}

function addToLocalStorage(question) {
		const all = getParsedQuestions()
		all.push(question)
		localStorage.setItem('questions', JSON.stringify(all))
}

function getParsedQuestions() {
		return JSON.parse(localStorage.getItem('questions') || '[]')
}

function toCard(question, index) {
		return `<tr>
		            <td>${index}</td>
		            <td class="list-text">
		            		<div>${question.text}</div>
		            		<br>
		            		<div>
											${new Date(question.date).toLocaleDateString()}
											${new Date(question.date).toLocaleTimeString()}
		            		</div>
		            </td>
		        </tr>`
}
