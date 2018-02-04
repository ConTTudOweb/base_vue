<template>
  <v-dialog v-model="dialog" max-width="290">
    <v-card>
      <v-card-title class="headline">Remover o Registro</v-card-title>
      <v-card-text>Você tem certeza que deseja remover o registro?</v-card-text>
      <v-card-actions>
        <v-btn color="green darken-1" flat="flat" @click="dialog = false">Não</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" flat="flat" @click="remover">Sim</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'remove',
  props: {
    api: {
      type: String,
      required: true
    },
    key: {
      type: String,
      required: true,
      default: 'id'
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    show (data) {
      this.data = data
      this.dialog = true
    },
    remover () {
      let url = `${this.api}${this.data[this.key]}/`
      this.axios.delete(url).then(
        res => {
          this.dialog = false
          this.$emit('update')
        },
        err => {
          console.log(err)
        }
      )
    }
  }
}
</script>
