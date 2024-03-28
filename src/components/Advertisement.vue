<template>
    <div id="carouselExample" class="carousel slide">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="@/assets/img/qc.jpg" class="d-block w-100">
          </div>
          <div class="carousel-item active">
            <img src="@/assets/img/qc2.jpg" class="d-block w-100">
          </div>
        </div>
        <button class="carousel-control-prev carousel-control" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next carousel-control" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
  </template>
  
  <script>
  export default {
    name: 'AdvertisementView'
  }
  </script>
  
  <style scoped>
  .carousel-control:hover{
    background-color: transparent;
  }
  </style>
  