<template>
    <div class="search-bar">
      <input v-model="searchTerm" class="form-control" type="text" placeholder="Tìm kiếm sản phẩm...">
      <button @click="search" class="btn btn-success">Tìm kiếm</button>
    </div>
  </template>
  
  <script>
  export default {
    name:"SearchComponent",
    data() {
      return {
        searchTerm: ''
      };
    },
    methods: {
      search() {
        this.$emit('search', this.searchTerm);
      }
    }
  };
  </script>
  
  <style>
  .search-bar {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
  
  .search-bar input {
    flex: 1;
  }
  .btn{
    height: 45px;
  }
  </style>
  