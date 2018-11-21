<template>
  <div>
    <a href="javascript:;" class="test">테스트 입니다.</a>
    <div class="content">
      테스트 컨텐츠 입니다..
    </div>
  </div>
  
</template>

<script>

  const doc = document;
  const link = doc.querySelector('.test');
  // const content = doc.querySelector('.content');

  console.log(doc);
  console.log(link);


  // link.addEventListener('click',function(e){
  //   content.style.backgroundColor = '#000'
  // })


export default {

}
</script>

<style>

</style>
