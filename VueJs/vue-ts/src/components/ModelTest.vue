<template>
  <div>
    <P>{{checked ? 'on' : 'off'}}</P>
    <button @click="changed">토글버튼</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model, Prop } from "vue-property-decorator";
@Component
export default class ModelTest extends Vue{

  @Prop()
  @Model('change')
  readonly checked!: boolean;
  changed(){
    this.$emit('change', !this.checked)
  }
}

</script>

<style>

</style>
