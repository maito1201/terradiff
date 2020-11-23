<template>
  <div id="app">
    <div class="tf-wrapper">
      <div class="tf-input-area">
        <textarea class="tf-text-area" v-model="input" placeholder="add multiple lines"></textarea>
      </div>
      <div class="result-area">
        <span v-html="parsedInput"></span>
      </div>
    </div>
  </div>
</template>

<script>
let template = 
`# aws_something_to_create will be created
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
  - resource "aws_something_to_delete" "my-something" {
      - id                  = "1" -> null
      - name                = "my-something" -> null
      - tags                = {} -> null
    }`
import parseTf from "./service/parsetf.js"
export default {
  name: 'App',
  data: function (){
    return {
      input: template,
    }
  },
  computed: {
    parsedInput: function (){
      return parseTf(this.input)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
div.tf-wrapper {
  display: flex;
}
div.tf-input-area {
  min-height: 800px;
  width: 50%;
}
div.result-area {
  min-height: 800px;
  width: 50%;
  text-align: left;
}
textarea.tf-text-area {
  width: 90%;
  height: 100%;
  min-height: 800px;
}

pre.tf-result{
  margin: 0;
  font-size: 16px;
}

pre.tf-title{
  margin-top: 10px;
  font-weight: bold;
  font-size: 20px;
}
pre.tf-add{
  background-color: green;
}

pre.tf-inplace{
  background-color: yellow;
}

pre.tf-destroy{
  background-color: red;
}
</style>
