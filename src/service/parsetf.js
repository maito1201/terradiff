const TF_CLASS_BY_PREFIX = {
    "+": "tf-result--add",
    "-": "tf-result--destroy",
    "~": "tf-result--update",
}

const NEST_OPEN_TOKEN = {
    "[": true,
    "{": true
}

const NEST_CLOSE_TOKEN = {
    "]": true,
    "}": true
}

let nestInfo = []
export default function parseTf(input, showCreated, showUpdated, showDestroy, showOther){
    let renderStarted = false
    let inputArray = input.split("\n")
    let parsedInput = inputArray.map(function(input) {
        const prefix = getPrefix(input)
        const suffix = getSuffix(input)

        if (!renderStarted && prefix == "#" && /(will|must) be/.test(input)) {
            renderStarted = true
        } else if (!prefix && !suffix && renderStarted && /(will|must) be/.test(input) && !nestInfo.length) {
            renderStarted = false
            return "</div>"
        } else if (!prefix && !suffix && !nestInfo.length) {
            renderStarted = false
        }

        if (prefix == "#" && /(will|must) be/.test(input)) {
            return renderStarted? "</div>" + titleHTML(input, showCreated, showUpdated, showDestroy, showOther)
                : titleHTML(input, showCreated, showUpdated, showDestroy)
        }

        if (input == "") return ""

        let cssClass = ""
        if (renderStarted) {
            cssClass = /resource "/.test(input)? "tf-result--resource-info" : TF_CLASS_BY_PREFIX[prefix]
            if (NEST_OPEN_TOKEN[suffix]) {
                nestInfo.push(cssClass)
            } else if (NEST_CLOSE_TOKEN[prefix]) {
                cssClass = nestInfo.pop()
            }
            if (cssClass == undefined) cssClass = ""
            return `<pre class="tf-result ${cssClass}">${input}</pre>`
        }
        return ""
    });
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

function getSuffix (input) {
    for (let index = input.length - 1; index >= 0; index--) {
        const c = input.charAt(index);
        if (c != ",") {
            return c
        }
    }
    return ""
}

function titleHTML(input, showCreated, showUpdated, showDestroy, showOther) {
    let cssClass = "tf-title"
    let wrapperClass = "tf-div"
    switch( true ){
    case /(will|must) be created/.test(input):
        cssClass = "tf-title tf-title--create"
        wrapperClass = showCreated? "tf-div" : "tf-div-hidden"
        break
    case /(will|must) be updated in-place/.test(input):
        cssClass = "tf-title tf-title--update"
        wrapperClass = showUpdated? "tf-div" : "tf-div-hidden"
        break
    case /(will|must) be destroyed/.test(input):
        cssClass = "tf-title tf-title--destroy"
        wrapperClass = showDestroy? "tf-div" : "tf-div-hidden"
        break
    default:
        wrapperClass = showOther? "tf-div" : "tf-div-hidden"
        break
    }
    return `<div class="${wrapperClass}"><span class="${cssClass}">${input}</span>`
}