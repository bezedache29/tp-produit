<template>
  <button :class="{ primary: primary, danger: danger, warning: warning }">
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
      danger: false,
      warning: false
    }
  },
  mounted() {
    this.primary = false
    this.danger = false
    this.warning = false
    this.setColor(this.color)
  },

  methods: {
    setColor(color) {
      // On chnage les propriétés CSS du bouton suivant la couleur de color
      if (color === 'primary') {
        this.primary = true
      } else if (color === 'danger') {
        this.danger = true
      } else {
        this.warning = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  border: none;
  background-color: white;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.primary {
  color: black;
  background-color: #F2E635;

  &:hover {
    background-color: #A68F1F;
    color: white;
  }
}
.danger {
  color: white;
  background-color: #F73B1E;

  &:hover {
    background-color: #c22e18;
    color: white;
  }
}
.warning {
  background-color: #F7CC20;
  color: black;

  &:hover {
    background-color: #af9118;
    color: white;
  }
}

</style>