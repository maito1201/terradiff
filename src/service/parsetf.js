const TF_CLASS_BY_PREFIX = {
    "#": "tf-title",
    "+": "tf-add",
    "-": "tf-destroy",
    "~": "tf-inplace",
}

let nestInfo = []
export default function parseTf(input){
    let inputArray = input.split("\n")
    let parsedInput = inputArray.map(function(input) {
        const prefix = getPrefix(input)
        const suffix = input.charAt(input.length - 1)
        let cssClass = TF_CLASS_BY_PREFIX[prefix]
        if (suffix == "{") {
            nestInfo.push(cssClass)
        } else if (suffix == "}") {
            cssClass = nestInfo.pop()
        }
        if (cssClass == undefined) cssClass = ""
        return `<pre class="tf-result ${cssClass}">${input}</pre>`
    });
    console.log(parsedInput.join(""))
    return parsedInput.join("")
}

function getPrefix (input) {
    for (let index = 0; index < input.length; index++) {
        const c = input.charAt(index);
        if (c != " ") {
            return c
        }
    }
    return ""
}