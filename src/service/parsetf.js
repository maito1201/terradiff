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
export default function parseTf(input){
    let renderStarted = false
    let inputArray = input.split("\n")
    let parsedInput = inputArray.map(function(input) {
        const prefix = getPrefix(input)
        const suffix = getSuffix(input)

        if (!renderStarted && prefix == "#" && /will be/.test(input)) {
            renderStarted = true
        } else if (!prefix && !suffix && renderStarted && /will be/.test(input)) {
            renderStarted = false
            return "</div>"
        }

        if (prefix == "#" && /will be/.test(input)) {
            return renderStarted? "</div>" + titleHTML(input) : titleHTML(input)
        }

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

function titleHTML(input) {
    let cssClass = "tf-title"
    switch( true ){
    case /will be created/.test(input):
        cssClass = "tf-title tf-title--create"
        break
    case /will be updated in-place/.test(input):
        cssClass = "tf-title tf-title--update"
        break
    case /will be destroyed/.test(input):
        cssClass = "tf-title tf-title--destroy"
        break
    }
    return `<div class="tf-div"><span class="${cssClass}">${input}</span>`
}