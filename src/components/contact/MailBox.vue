<template>
  <div class="mailbox-placement">
    <h1>Boite de réception</h1>
    <ul>
      <li v-for="(mail, id) in mails" :key="id">
        <details @click="changeStatus({mail, id})" :class="mail.status == 1 ? 'seen' : ''">
          <summary>{{mail.email}} à écrit {{mail.object}}</summary>
          <p>{{mail.name}} à écrit:</p>
          <p>{{mail.content}}</p>
          <button-primary color="danger" @click.prevent="del(id)">Supprimer</button-primary>
        </details>
      </li>
    </ul>
  </div>

</template>

<script>
import { mapActions, mapState } from 'vuex'
import ButtonPrimary from '../UI/buttons/ButtonPrimary'
export default {
  mounted() {
    this.getMails()
  },
  methods: {
    ...mapActions('contact', ['getMails', 'del', 'changeStatus']),
  },
  computed: {
    ...mapState('contact', ['mails', 'isSeen']),
  },
  components: {
    ButtonPrimary,
  },
}
</script>

<style scoped lang="scss">

  .mailbox-placement {
    margin-top: 40px;
  }

  h1 {
    text-align: center;
    margin: 20px;
  }

  .seen {
    background-color: white;
    summary {
      font-weight: normal;
    }
  }

  details {
    margin: 1rem auto;
    padding: 0 1rem;
    width: 35em;
    max-width: calc(100% - 2rem);
    position: relative;
    border: 1px solid #78909C;
    border-radius: 6px;
    color: #263238;
    transition: background-color .15s;
    background-color: #A68F1F;
  }

  details > :last-child {
    margin-bottom: 1rem;
  }

  details::before {
    width: 100%;
    height: 100%;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border-radius: inherit;
    opacity: .15;
    box-shadow: 0 .25em .5em #263238;
    pointer-events: none;
    transition: opacity .2s;
    z-index: -1;
  }

  details[open] {
    background-color: #FFF;
  }

  details[open]::before {
    opacity: .6;
  }

  summary {
    padding: 1rem 2em 1rem 0;
    display: block;
    position: relative;
    font-size: 1.33em;
    cursor: pointer;
    font-weight: bold;
  }

  summary::before, summary::after {
    width: .75em;
    height: 2px;
    position: absolute;
    top: 50%;
    right: 0;
    content: '';
    background-color: currentColor;
    text-align: right;
    transform: translateY(-50%);
    transition: transform .2s ease-in-out;
  }

  summary::after {
    transform: translateY(-50%) rotate(90deg);
  }

  [open] summary::after {
    transform: translateY(-50%) rotate(180deg);
  }

  summary::-webkit-details-marker {
    display: none;
  }

  p {
    margin: 0 0 1em;
    line-height: 1.5;
  }

  ul {
    margin: 0 0 1em;
    padding: 0 0 0 1em;
  }

  li:not(:last-child) {
    margin-bottom: 0.5em;
  }

  code {
    padding: 0.2em;
    border-radius: 3px;
    background-color: #E0E0E0;
  }

  pre > code {
    display: block;
    padding: 1em;
    margin: 0;
  }
</style>