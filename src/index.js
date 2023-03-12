import './index.html';
import './index.scss';

let text = document.getElementById('commentText')
let name = document.getElementById('name')
let date = document.querySelector('input[type = "date"]')
let i = 0
let imagesPath = 'http://localhost:3000/assets'

//ограничение календаря, чтобы не было сообщений из будущего
date.setAttribute('max', getDate())

//предварительное получение числа комментариев и добавление обработчиков событий к имеющимся кнопкам лайка
getCommentsCounter()
likesToggle()

//скрытие и появление сайдбара
function toggleSideBar() {
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
                <span class = "solo-comments__date">
                    ${getDaysDifference()}, ${getTime()}
                </span>
                <p class = "solo-comments__text">
                    ${text.value.trim()}
                </p>
            </div>
        </div>
        <div class = "solo-comments__actions">
            <span class = "solo-comments__likesCounter">0</span>
            <svg class = "solo-comments__like"
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path class="stroke-like" d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956
                      3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467
                      3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14
                      9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216
                      12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"
                      stroke="#868d9a"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"/>
            </svg>
            <svg data-del="delete"
                 width="30px"
                 height="30px"
                 viewBox="0 0 24 24"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                 <path opacity="0.15"
                       d="M18 18V6H6V18C6 19.1046 6.89543
                       20 8 20H16C17.1046 20 18 19.1046 18 18Z"
                       fill="none"/>
                 <path d="M10 10V16M14 10V16M18 6V18C18 19.1046
                       17.1046 20 16 20H8C6.89543 20 6 19.1046 6 18V6M4
                       6H20M15 6V5C15 3.89543 14.1046 3 13 3H11C9.89543 3 9 3.89543
                       9 5V6"
                       stroke="#868d9a"
                       stroke-width="1.5"
                       stroke-linecap="round"
                       stroke-linejoin="round"/>
            </svg>
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
    let icons = Array.from(document.getElementsByClassName("stroke-like"))

    likeButtons.forEach((button, index) => {
        if (i !== 0 && index !== 0) return
        
        button.addEventListener("click", () => {
            icons[index].classList.toggle('active-svg')
            button.classList.toggle("is-active")
            const current = Number(likeCounts[index].innerHTML)
            const inc = button.classList.contains("is-active") ? 1 : -1
            likeCounts[index].innerHTML = current + inc
        })
    })
//установка значения глобальной переменной с целью предотвращения повторной установки слушателя клика     
    i = 1
}
//все остальные обработчики событий
commentText.addEventListener("beforeinput", () =>
    notice.style.visibility = "hidden")

commentText.addEventListener("keydown", (e) => {
    if (e.key === "Enter") postComment(e) 
})

name.addEventListener("beforeinput", () =>
    notice.style.visibility = "hidden")

hider.addEventListener("click", toggleSideBar)

typeComment.addEventListener("click", postComment)

document.addEventListener("click",
    removeComment("solo-comments__body", "data-del", "delete"))