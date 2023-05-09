import './styles.css';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
new AirDatepicker('#datepicker', { timepicker: true });

const form = document.querySelector('.form');
const formTowerSelect = document.querySelector('#tower-select');
const formFloorSelect = document.querySelector('#floor-select');
const formConferenceSelect = document.querySelector('#conference-select');
const formInput = document.querySelector('#datepicker');
const formComment = document.querySelector('#comment');
const buttonFormClear = form.querySelector('.form__button_type_clear');

const arrayFloor = getOption(3, 27);
const arrayConferenceRoom = getOption(1, 10);

function getOption(startIndex, endIndex) {
  const array = [];
  for (let i = startIndex; i <= endIndex; i++) {
    array.push(i)
  }
  return array.map((el) => ({
    value: el,
    text: el,
  }));
}
function createOption(item) {
  const templateSelector = document.querySelector('#template-selector').content;
  const elementOption = templateSelector.querySelector('.form__option').cloneNode(true);

  elementOption.textContent = item.text;
  elementOption.value = item.value;

  return elementOption;
}

arrayFloor.forEach(item => {
  const newEl = createOption(item);
  formFloorSelect.append(newEl);
})

arrayConferenceRoom.forEach(item => {
  const newEl = createOption(item);
  formConferenceSelect.append(newEl);
})

function handleFormSubmit(evt) {
  evt.preventDefault();
  const checkValidation = enableValidation();
  if (checkValidation) {
    const valueTower = formTowerSelect.value;
    const valueFloor = formFloorSelect.value;
    const valueConference = formConferenceSelect.value;
    const inputData = formInput.value;
    const textComment = formComment.value;
    const isValid = [valueTower, valueFloor, valueConference, inputData].every((el) => Boolean(el))

    console.log(isValid)
    console.log(JSON.stringify({
      tower: valueTower,
      floor: valueFloor,
      conferenceRoom: valueConference,
      data: inputData,
      comment: textComment,
    }))
    form.reset();
  }
}

function resetForm() {
  form.reset();
}

const enableValidation = () => {
  const selects = [formTowerSelect, formFloorSelect, formConferenceSelect, formInput].filter((element) => !element.value);
  if (selects.length) {
    selects.forEach((select) => {
      select.classList.add('error');
      formInput.classList.add('error');
    });
    return false
  } else {
    [formTowerSelect, formFloorSelect, formConferenceSelect, formInput].forEach((select) => {
      select.classList.remove('error');
      formInput.classList.remove('error');
    })
    return true
  }
}

form.addEventListener('submit', handleFormSubmit);
buttonFormClear.addEventListener('click', resetForm)