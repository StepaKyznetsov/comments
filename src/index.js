import './index.html';
import './index.scss';

let text = document.getElementById('commentText')
let name = document.getElementById('name')
let date = document.querySelector('input[type = "date"]')
let i = 0
let imagesPath = 'http://localhost:3000/assets'

//предварительное получение числа комментариев и добавление обработчиков событий к имеющимся кнопкам лайка
getCommentsCounter()
likesToggle()

//скрытие и появление сайдбара
function hideNav() {
    if (nav.style.display !== 'none') {
        nav.style.display = 'none'
        leftArrow.style.left = '0'
        map.style.left = '20px'
        hider.style.left = '20px'
    }
    else {
        nav.style.display = 'block'
        leftArrow.style.left = '246px'
        map.style.left = '265px'
        hider.style.left = '265px'
    }
}
//создание комментария
function postComment(e) {
    e.preventDefault()

    if (name.value.trim().length < 2 || name.value.trim().length > 30 || text.value.trim().length < 5)
        return notice.style.visibility = "visible"

    comments.insertAdjacentHTML('afterbegin', 
    `
    <div class = "solo-comments__body">
        <div class = "solo-comments__leftblock">
            <img class = "solo-comments__avatar" src = "${imagesPath}/j.jpg" alt = "avatar">
            <div class = "solo-comments__info">
                <span class = "solo-comments__name">
                    ${name.value.trim()}
                </span>
                <span  class = "solo-comments__date">
                    ${getDaysDifference()}, ${getTime()}
                </span>
                <p class = "solo-comments__text">
                    ${text.value.trim()}
                </p>
            </div>
        </div>
        <div class = "solo-comments__actions">
            <span class = "solo-comments__likesCounter">0</span>
            <img id = "like" class = "solo-comments__like" src = "${imagesPath}/like.svg" alt = "like">
            <img data-del="delete" src = "${imagesPath}/delete.svg" alt="delete">
        </div>
    </div>
    `
    )

    name.value = ''
    text.value = ''
    date.value = ''

    getCommentsCounter()
    likesToggle()
}
//удаление комментария
function removeComment(delElem, attribute, attributeName) {

    if (!(delElem && attribute && attributeName)) return

    return function(e) {

        let target = e.target

        if (!(target.hasAttribute(attribute) ?
            target.getAttribute(attribute) === attributeName : false)) return

        while (target !== this) {
          if (target.classList.contains(delElem)) {
            target.remove()
            getCommentsCounter()
            return
          }
        target = target.parentNode
        }   
    }
}
//получение сегодняшней даты
function getDate() {
    const date = new Date()

    let day = String(date.getDate())
    let month = String(date.getMonth() + 1)
    let year = date.getFullYear()

    if (day.length === 1) day = '0' + day
    if (month.length === 1) month = '0' + month

    return `${year}-${month}-${day}`
}    
//получение текущего времени
function getTime() {
    const date = new Date()

    let hours = String(date.getHours())
    let minutes = String(date.getMinutes())

    if (hours.length === 1) hours = '0' + hours
    if (minutes.length === 1) minutes = '0' + minutes

    return `${hours}:${minutes}`
}
//получение разницы между текущей и вводимой датами
function getDaysDifference() {

    if (!date.value) return 'Сегодня'

    let messageDate = new Date(date.value)
    let today = new Date(getDate())

    let diff = Math.floor((today - messageDate) / (1000 * 60 * 60 * 24))

    switch (diff) {
        case 0:
            return 'Сегодня'
        case 1:
            return 'Вчера'
        case 2:
            return '2 дня назад'
        case 3:
            return '3 дня назад'
        case 4:
            return '4 дня назад'
        case 5:
            return '5 дней назад'
        default :
            return date.value.split('-').reverse().join('-')
    }
}
//счетчик коммментариев
function getCommentsCounter() {
    return commentsCounter.textContent = 
        `Комментариев: ${document.querySelectorAll('.solo-comments__body').length}`
}
//обработчики событий для лайков
function likesToggle() {
    let likeButtons = Array.from(document.querySelectorAll('.solo-comments__like'))
    let likeCounts = Array.from(document.querySelectorAll('.solo-comments__likesCounter'))

    likeButtons.forEach((button, index) => {
        if (i !== 0 && index !== 0) return
        
        button.addEventListener("click", () => {
            button.classList.toggle("is-active")
            const current = Number(likeCounts[index].innerHTML)
            const inc = button.classList.contains("is-active") ? 1 : -1
            likeCounts[index].innerHTML = current + inc
            button.removeEventListener("click")
        })
    })
    i = 1
}
//все остальные обработчики событий
commentText.addEventListener("beforeinput", () =>
    notice.style.visibility = "hidden")

name.addEventListener("beforeinput", () =>
    notice.style.visibility = "hidden")

hider.addEventListener("click", hideNav)

typeComment.addEventListener("click", postComment)

document.addEventListener("click",
    removeComment("solo-comments__body", "data-del", "delete"))