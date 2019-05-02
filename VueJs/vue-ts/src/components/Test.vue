<template>
  <p>
    {{ name }}
    {{ fullName }}
    {{ person.age }}
    <button @click="click">클릭 </button>
    <button @click="emitTest1(2019, 2020)">emitTest1 </button>
  </p>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from "vue-property-decorator";

interface Person {
  name: string
  age: number
}

@Component
export default class Test extends Vue {
  name: string = 'merlin';
  // @Prop(Number) readonly time!: number // ! strict 바로 값을 할당해주지 않으면.. 에러지만 !를 달아주면 어딘가 다른지점에서 넣어준다. 라는 뜻으로 달아준다.  
  // name: 'Mark' | 'Anna' = 'Mark'
  @Prop({
    default: 25
  }) readonly time!: number

  person: Person = {
    name: 'merlin',
    age: 32
  }
  click() {
    this.person.age--
    // this._hello()
  }

  private _hello() {
    this.name = 'Dennis'
  }

  // computed: {}
  get fullName() {
    return `${this.name} Lee`
  }
  // 메서드 명으로 라이프사이클 구분
  create() {
    console.log('created')
  }

  // name이라는 게 변경되면 불리어지는 함수다. 
  @Watch('name')
  onNameChange(newValue: number, oldValue: number) {
    console.log(newValue, oldValue)
  }

  // person 안에 있는 값만 바뀌는거에대해서는 체크를 못한다 full scan 해서 해야하는 옵션을 넣어줘야 한다.
  // immediate 최초의 컴포넌트가 만들어질때 즉시 실행한다. oldPerson은 undefined…
  @Watch("person", {
    deep: true,
    immediate: true
  })
  onPersonChange(newPerson: Person, oldPerson: Person) {
    console.log(newPerson, oldPerson)
  }

  @Emit('emit-test-one') // 이름만 알려주는거
  emitTest1(year:number,year2:number){
    this.person.age++;
    return 1985;
  }  // this.$emit('emit-test1', return , arguments)
}
</script>