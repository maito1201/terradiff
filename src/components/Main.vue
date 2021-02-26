<template>
  <div class="tf-wrapper">
    <column-gutter
      :column="2"
      :width="'100vw'"
      :height="this.resultHeight"
      :gutter-sizes="['4px', '1rem', '1em']"
      :colors="['#623ce4']"
      :column-sizes="[1,1]"
    >
      <div slot="col-0" class="tf-input-area form-group">
        <div class="input-group button-wrapper">
          <button class="btn btn-outline-info clear-button" @click="clearInput">clear</button>
        </div>
        <textarea id="tf-input" class="tf-text-area form-control" v-model="input" @input="resizeBorder" :placeholder="template"></textarea>
      </div>
      <div slot="col-1">
        <div ref="right" style="position:absolute">
          <div class="input-group mb-2 ml-2">
            <div class="input-group-prepend">
              <div class="input-group-text">show</div>
            </div>
            <select v-model="select" @change="showSelected" class="form-control">
              <option>all</option>
              <option>created</option>
              <option>updated</option>
              <option>destroy</option>
            </select>
          </div>
          <div class="result-area ml-2" v-html="parsedInput">
          </div>
        </div>
      </div>
    </column-gutter>
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
import { ColumnGutter } from 'vue-gutter-resize'
import 'vue-gutter-resize/dist/vue-gutter-resize.css'
export default {
  name: 'Main',
  data: function (){
    return {
      input: "",
      template: TEMPLATE,
      select: "all",
      showCreated: true,
      showUpdated: true,
      showDestroy: true,
      resultHeight: '846px'
    }
  },
  computed: {
    parsedInput: function (){
      if (this.input == "") return parseTf(TEMPLATE, this.showCreated, this.showUpdated, this.showDestroy)
      const sanitized = sanitizeInput(this.input)
      return parseTf(sanitized, this.showCreated, this.showUpdated, this.showDestroy)
    }
  },
  methods: {
    clearInput: function (){
      this.input = ""
      this.resizeBorder()
    },
    showSelected: function (){
      if (this.select == "created") {
        this.showCreated = true
        this.showUpdated = false
        this.showDestroy = false
      } else if (this.select == "updated") {
        this.showCreated = false
        this.showUpdated = true
        this.showDestroy = false
      } else if (this.select == "destroy") {
        this.showCreated = false
        this.showUpdated = false
        this.showDestroy = true
      } else {
        this.showCreated = true
        this.showUpdated = true
        this.showDestroy = true
      }
      this.resizeBorder()
    },
    resizeBorder: function (){
      setTimeout(this.execResize, "100");
    },
    execResize: function (){
      const dom = this.$refs.right; /* <h1 ref="title">Hello World</h1> */
      const rect = dom.getBoundingClientRect(); // 要素の座標と幅と高さを取得
      this.resultHeight = `${rect.height}px`
    }
  },
  components: {
    ColumnGutter
  }
}
</script>

<style>
body {
  height: 100%;
  margin: 0;
}

div.tf-wrapper {
  display: flex;
  padding: 10px;
  height: 100%;
}
div.tf-input-area {
  min-height: 800px;
  width: 100%;
  padding: 0 5px;
  overflow: hidden;
}
div.result-area {
  min-height: 800px;
  min-width: 100%;
  text-align: left;
}
textarea.tf-text-area {
  height: 100%;
  min-height: 800px;
  max-height: 95%;
  overflow: hidden;
}

pre.tf-result{
  margin: 0;
  font-size: 16px;
  border-bottom: dashed 1px ghostwhite;
  background-color: white;
  overflow: visible;
  padding: 0 20px 0 0;
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

div.tf-div-hidden {
  display: none;
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

div.gutter-v{
  transition: all 1s ease 100ms;
}
</style>