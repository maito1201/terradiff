export default function sanitizeInput(input){
    const sanitizeRegexp = /<\/*[a-z]*>/g
    return input.replace(sanitizeRegexp, "")
}
