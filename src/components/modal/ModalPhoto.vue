<template>
  <div class="modal">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-content">
      <slot name="header"></slot>
      <slot name="body"></slot>
    </div>
  </div>
</template>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
}

.modal-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.modal-content {
  position: relative;
  background-color: #fff;
  padding: 0px 20px;
  border-radius: 10px;
}
</style>
