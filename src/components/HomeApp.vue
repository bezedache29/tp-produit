<template>
  <div class="placement">
    <div class="txt">
      <h1>n°1 du high-tech et du matériel informatique, élu Service Client de l'Année. Comparez et achetez en livraison rapide à domicile ou en magasin.</h1>
    </div>
    <img src="https://jvmag.ch/wp-content/uploads/2019/07/1715379876_ap.jpg" alt="" class="bg-image">
  </div>
</template>

<script>
export default {
  name: 'home-app',
}
</script>

<style scoped>

  .txt {
    display: flex;
    justify-content: center;
  }
  h1 {
    margin-top: 15%;
    color: white;
    font-size: 40px;
    width: 60%;
  }

  .placement {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    overflow: hidden;
    height: 100vh;
    width: 100vw;
  }

  .bg-image {
    position: absolute;
    top: 5%;
    z-index: -2;
    height: 100vh;
    width: 100vw;
    transform: scaleX(1.1);
    filter: blur(8px);
  }
</style>
