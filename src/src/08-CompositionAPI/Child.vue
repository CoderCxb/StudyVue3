<template>
</template>

<script>
import { inject } from 'vue';
export default {
  setup(){
    console.log(inject('hello'));
  }
}
</script>

<style>

</style>