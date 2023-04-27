export default function DisplayDate ({ date }){
    let dateObj = null
    try {
        dateObj = (new Date(date)).toLocaleDateString("en-US")
    } catch { }
    return dateObj
}