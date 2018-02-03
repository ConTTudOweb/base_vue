<template>
  <h1>teste</h1>
</template>

<script>
export default {
  name: 'formBank',
  data () {
    return {
      form: {
        id: 0,
        code: '',
        description: ''
      }
    }
  },
  methods: {
    show (data) {

    }
  },
  computed: {
    edit () {
      return this.form.id !== 0
    }
  }
}
</script>
