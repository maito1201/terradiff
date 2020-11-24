<template>
<div>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">terradiff</a>
    <!-- Button trigger modal -->
  <button type="button" class="btn btn-outline-secondary about-button" @click="toggleModal">
    about
  </button>
  </nav>
  
  <!-- Modal -->
  <div class="modal-wrapper" v-show="isModalOpen" @click="toggleModal">
    <div class="card card-about">
      <div class="card-body">
        <h5 class="card-title">About terradiff</h5>
        <p class="card-text">terradiff is a web application to check the difference of terraform apply.</p>
        <p class="card-text">It is made as app works only on the browser(Javascript).</p>
        <p class="card-text">No communication with the server is done.</p>
        <p class="card-text">No Warranty and Disclaimer makes no warranty as to the accuracy or appropriateness of contents</p>
        <p class="card-text">and result of terraform apply.</p>
        <p class="card-text">terradiffはterraform applyの差分を確認するためのweb appです。</p>
        <p class="card-text">ブラウザ(Javascript)上でのみ動作する仕組みのため、</p>
        <p class="card-text">サーバーとの通信は一切行われません。</p>
        <p class="card-text">コンテンツの内容、及びterraform applyの結果についてはいかなる内容も保証いたしません。</p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
    name: "Navbar",
    data: function (){
        return {
            isModalOpen: false,
        }
    },
    methods: {
        toggleModal: function (){
            this.isModalOpen = !this.isModalOpen
        }
    }
}
</script>

<style scoped>
.navbar-brand{
    margin: 0 10px;
}
.modal-wrapper{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    background-color: #000000ab;
    z-index: 999;
}

.card-about{
    width: 800px;
    margin: 200px auto;
    vertical-align: middle;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    height: 430px;
    text-align: left;
    position: absolute;
}

.about-button{
    position: absolute;
    right: 10px;
}
</style>