<template>
    <div class="modal-overlay" v-if="show">
      <div class="modal-box">
        <p>{{ message }}</p>
        <div class="modal-actions">
          <button @click="$emit('confirm')" class="button button-danger extra-padding">Yes</button>
          <button @click="$emit('cancel')" class="button button-secondary extra-padding">No</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name:"ModalConfirm",
    props: {
      show: Boolean,
      message: {
        type: String,
        default: "Are you sure?"
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  
  .modal-box {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    text-align: center;
  }
  
  .modal-actions {
    margin-top: 15px;
    display: flex;
    justify-content: space-around;
  }
  .extra-padding{
    padding: 10px 50px;
  }
  @media (max-width: 768px) { 
    .modal-box{
      max-width:200px;
    }
    .modal-actions{
    flex-wrap: wrap;
    gap: 10px;
  }
  .modal-box p{
    font-size: 9px;
  }
  }
  </style>
  