<template>
  <div class="tf-wrapper">
    <div class="tf-input-area form-group">
        <div class="input-group button-wrapper">
          <button class="btn btn-outline-info clear-button" @click="clearInput">clear</button>
        </div>
        <textarea id="tf-input" class="tf-text-area form-control" v-model="input" :placeholder="template"></textarea>
    </div>
    <div class="result-area" v-html="parsedInput"></div>
  </div>
</template>

<script>
const TEMPLATE = 
`Paste your result of "terraform plan"
# aws_something_to_create will be created
  + resource "aws_something" "my-something" {
      + arn                              = (known after apply)
      + tags                             = {
        + "Name" = "my-something"
      }
    }

# aws_something_to_update will be updated in-place
  ~ resource "aws_something" "my-something" {
      ~ id                    = "1" -> "2"
      - description           = "this is something will update" -> null
      ~ variables             = {
          - "ENV" = "prod" -> null
        }
    }

# aws_something_to_destroy will be destroyed
  - resource "aws_something" "my-something" {
      - id                  = "1" -> null
      - name                = "my-something" -> null
      - tags                = {} -> null
    }`
import parseTf from "../service/parsetf.js"
import sanitizeInput from "../service/sanitizer.js"
export default {
  name: 'Main',
  data: function (){
    return {
      input: "",
      template: TEMPLATE
    }
  },
  computed: {
    parsedInput: function (){
      if (this.input == "") return parseTf(TEMPLATE)
      const sanitized = sanitizeInput(this.input)
      return parseTf(sanitized)
    }
  },
  methods: {
    clearInput: function (){
      this.input = ""
    }
  }
}
</script>

<style>
div.tf-wrapper {
  display: flex;
  padding: 10px;
}
div.tf-input-area {
  min-height: 800px;
  width: 50%;
  padding: 0 10px;
}
div.result-area {
  margin-top: 35px;
  min-height: 800px;
  width: 50%;
  text-align: left;
}
textarea.tf-text-area {
  height: 100%;
  min-height: 800px;
  max-height: 95%;
}

pre.tf-result{
  margin: 0;
  font-size: 16px;
  border-bottom: dashed 1px ghostwhite;
  background-color: white;
}

pre.tf-result--resource-info {
  background-color: floralwhite;
}

pre.tf-result--add {
  background-color: #dcffe4;
}

pre.tf-result--update {
  background-color: #fff6b3;
}

pre.tf-result--destroy {
  background-color: #ffeef0;
}

pre.tf-title{
  margin-top: 10px;
  font-weight: bold;
  font-size: 20px;
}

div.tf-div {
  margin: 10px 0;
  border-radius: 14px;
  overflow: hidden;
  border: solid 4px gray;
}

span.tf-title {
  display: block;
  font-weight: bold;
  font-size: 20px;
  border: 5px solid #dee2e6;
  border-radius: 8px 8px 0 0;
  padding: 3px;
  background-color: white;
}

span.tf-title--create{
  border-color: #56d974;
  color: #56d974;
}
span.tf-title--destroy{
  border-color: #fc5e6d;
  color: #fc5e6d;
}
span.tf-title--update{
  border-color: #f0cd62;
  color: #f0cd62;
}
.button-wrapper{
  margin: 0 0 10px 0;
}
</style>