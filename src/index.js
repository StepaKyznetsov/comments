import './index.html';
import './index.scss';

let text = document.getElementById('commentText')
let name = document.getElementById('name')
let date = document.querySelector('input[type = "date"]')
let i = 0

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

    if (name.value.length < 2 || name.value.length > 30 || text.value.length < 5) 
        return notice.style.visibility = "visible"

    let imagesPath = 'http://localhost:3000/assets'

    comments.insertAdjacentHTML('afterbegin', 
    `
    <div class = "solo-comments__body">
        <div class = "solo-comments__leftblock">
            <img class = "solo-comments__avatar" src = "${imagesPath}/j.jpg" alt = "avatar">
            <div class = "solo-comments__info">
                <span class = "solo-comments__name">
                    ${name.value}
                </span>
                <span  class = "solo-comments__date">
                    ${getDaysDifference()}, ${getTime()}
                </span>
                <p class = "solo-comments__text">
                    ${text.value}
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
    let typeDate = ''

    if (!date.value) return 'Сегодня'

    let messageDate = new Date(date.value)
    let today = new Date(getDate())

    let diff = Math.floor((today - messageDate) / (1000 * 60 * 60 * 24))

    switch (diff) {
        case 0:
            typeDate = 'Сегодня'
            break
        case 1:
            typeDate = 'Вчера'
            break
        case 2:
            typeDate = '2 дня назад'
            break
        case 3:
            typeDate = '3 дня назад'
            break
        case 4:
            typeDate = '4 дня назад'
            break
        case 5:
            typeDate = '5 дней назад'
            break
        default :
            typeDate = date.value.split('-').reverse().join('-')
            break
    }
    return typeDate
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
            button.classList.toggle("is-active");
            const current = Number(likeCounts[index].innerHTML);
            const inc = button.classList.contains("is-active") ? 1 : -1;
            likeCounts[index].innerHTML = current + inc;
            button.removeEventListener("click")
        })
    }) 
    i++
}
//все остальные обработчики событий
commentText.addEventListener("beforeinput", () => notice.style.visibility = "hidden")
name.addEventListener("beforeinput", () => notice.style.visibility = "hidden")
hider.addEventListener("click", hideNav)
typeComment.addEventListener("click", postComment)
document.addEventListener("click", removeComment("solo-comments__body", "data-del", "delete"))