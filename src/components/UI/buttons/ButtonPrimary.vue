<template>
  <button :class="{ primary: primary, danger: danger }">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'button-primary',
  props: {
    color: String,
  },
  data() {
    return {
      primary: false,
      danger: false
    }
  },
  mounted() {
    this.primary = false
    this.danger = false
    this.setColor(this.color)
  },

  methods: {
    setColor(color) {
      // On chnage les propriétés CSS du bouton suivant la couleur de color
      if (color === 'primary') {
        this.primary = true
      } else if (color === 'danger') {
        this.danger = true
      } 
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  border: none;
  background-color: white;
  border: 1px solid black;
  border-radius: 12px;
  padding: 10px 40px;
  cursor: pointer;
}
.primary {
  color: #F56A00;
  border: 1px solid #F56A00;
  background-color: #FFD294;

  &:hover {
    background-color: #F56A00;
    color: #FFD294;
  }
}
.danger {
  color: #FFD294;
  border: 1px solid #F73B1E;
  background-color: #F73B1E;

  &:hover {
    background-color: white;
    color: #F73B1E;
  }
}

</style>