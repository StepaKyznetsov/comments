import './index.html';
import './index.scss';

hider.onclick = function() {
    if (nav.style.display != 'none') {
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

function removeElem(delElem, attribute, attributeName) {

    if (!(delElem && attribute && attributeName)) return

    return function(e) {

        let target = e.target

        if (!(target.hasAttribute(attribute) ?
            (target.getAttribute(attribute) === attributeName ? true : false) : false)) return

        while (target != this) {
          if (target.classList.contains(delElem)) {
            target.remove()
            return
          }
        target = target.parentNode
        }
    }
}

document.addEventListener("click", removeElem("solo-comments__body", "data-del", "delete"))