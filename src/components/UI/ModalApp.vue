<template>
  <div class="modal">
    <div class="modal__wrap">
      <div class="modal__header">
          <h2><slot name="header"></slot></h2>
      </div>
      <div class="modal__content">
        <slot></slot>
      </div>
      <div class="modal__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal-app',
}
</script>

<style lang="scss">
.modal {
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  overflow-x: hidden;
  background-color: rgba(222, 174, 106, .75);
  transition: opacity 250ms 700ms ease;

  &__wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 50%;
    margin: 20px auto;
    border-radius: 4px;
    overflow: hidden;
    padding-bottom: 20px;
    background-color: #fff;
    box-shadow: 0 12px 25px 0 rgba(199,175,189,.25);
    padding: 20px;
    border-radius: 10px;
    border: 2px solid #F56A00;
  }
  &__header {
    display: flex;
    justify-content: center;
    padding-top: 10px;
    padding-bottom: 20px;
    font-weight: bold;
    border-bottom: 1px solid black;
  }
  &__content {
    padding-top: 20px;
    border-bottom: 1px solid black;
    padding-bottom: 10px;
  }
  &__footer {
    display: flex;
    justify-content: center;
    align-self: flex-end;
    margin: 0 10%;
    padding-top: 20px;
  }
}
</style>