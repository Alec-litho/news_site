
export const update = function(e) {
    window.scrollTo(0, 0)
    let elements = [...e.target.parentNode.childNodes]
    elements.forEach(child => child.className = 'chooseBTN')
    e.target.className = 'chooseBTN curr'
}