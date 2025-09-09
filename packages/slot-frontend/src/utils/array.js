export function pickRandomItem(list) {
    return list[Math.floor(Math.random() * list.length)]
}

export  function isValidIndex(list, index) {
    return index >= 0 && index < list.length;
}