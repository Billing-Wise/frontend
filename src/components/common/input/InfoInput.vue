<template>
  <div class="info-input">
    <div class="title-box">
      {{ title }}
    </div>
    <input 
      :type="type? type : 'text'" 
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)">
  </div>
</template>

<script>
export default {
  name: 'InfoInputtVue',
  props: {
    'title' : String,
    'modelValue': [String, Number],
    'type': String
  },
  emits: ['update:modelValue']

}
</script>

<style lang='scss' scoped>
  .info-input {
    @include flex-box(row, center, 0px);
    width: 100%;
    height: 40px;

    .title-box {
      @include flex-box(row, center, 0px);
      @include white-text(16px);
      background: $theme-color;
      min-width: 90px;
      width: 90px;
      height: 100%;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    input {
      flex-grow: 1;
      height: 100%;
      padding: 0px 10px;
      font-weight: bold;
      font-size: 14px;
      border: $theme-color solid;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      background-color: white;
      &:focus {
        outline: none;
      }
    }

  }
</style>