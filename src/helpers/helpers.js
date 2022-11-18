export default function getDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let MM = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let HH = String(today.getHours()).padStart(2, '0')
    let mm = String(today.getMinutes()).padStart(2, '0')
    let ss = String(today.getSeconds()).padStart(2, '0')

    today = yyyy + '-' + MM + '-' + dd + ', ' + HH + ":" + mm + ":" + ss;
    return today
}