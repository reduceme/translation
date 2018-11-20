<template>
  <div>
    <input v-model.number.lazy="age" type="number">
    <button @click="submit">测试</button>
  </div>
</template>

<script>
export default{
  name: 'test',
  data () {
    return {
      age: '1325'
    }
  },
  methods: {
    submit () {
      console.log(this.age)
      console.log(typeof this.age)
    }
  }
}
</script>

<style scoped></style>
