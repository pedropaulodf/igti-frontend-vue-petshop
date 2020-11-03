<script>
export default {
  methods: {
    finalizarServico(cliente) {
      this.$emit('atendido', cliente);
    }
  }
}
</script>