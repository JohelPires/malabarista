export function money(num) {
    num = parseFloat(num)
    return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}
