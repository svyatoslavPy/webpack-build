import './styles/main.css' // import styles

const inputSearch = document.querySelector('.input-search');
const searchBtn = document.getElementById('search__btn');
const radioBtn = document.querySelectorAll('.status');
const resultSearch = document.querySelector('.result-search');
const inputWrapper = document.querySelector('.input__wrapper');
const modal = document.querySelector('.modal');

const valueRadioBtn = {
	value: '',
	name: '',
	picture: ''
};

async function getСharacter() {
	try {
		const responce = await fetch(`https://rickandmortyapi.com/api/character/?name=${inputSearch.value}&status=${valueRadioBtn.value}`);
		const date = await responce.json();
		console.log(date)
		date.results.forEach(item => {
			resultSearch.innerHTML = `
				<p>id: ${item.id}</p>, <p>name: ${item.name}</p>, <p>status: ${item.status}</p>, <p>species: ${item.species}</p>`;
			resultSearch.setAttribute("div-name", `${item.name}`)
			resultSearch.setAttribute("div-picture", `${item.image}`)
		})
	} catch (err) {
		console.log('Request failed')
	}

}

radioBtn.forEach(item => {
	item.addEventListener('click', () => {
		valueRadioBtn.value = item.value;
	})
})


searchBtn.addEventListener('click', () => {
	getСharacter()
})


resultSearch.addEventListener('click', (e) => {
	valueRadioBtn.name = e.target.getAttribute("div-name");
	valueRadioBtn.picture = e.target.getAttribute("div-picture");

	inputWrapper.classList.add('input__wrapper--special');
	modal.classList.add('modal--primary');

	if (valueRadioBtn.name !== null && valueRadioBtn.picture !== null) {
		modal.innerHTML = `<p class="modal__text">Info</p><p class="modal__text">${valueRadioBtn.name}</p><img class="picture" src="${valueRadioBtn.picture}" alt="picture">`
	} else {
		return;
	}
	e.stopPropagation();
})

modal.addEventListener('click', (e) => {
	e.stopPropagation();
})

document.addEventListener('click', () => {
	inputWrapper.classList.remove('input__wrapper--special');
	modal.classList.remove('modal--primary');
})