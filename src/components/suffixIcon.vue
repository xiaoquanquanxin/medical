<template>
    <span style="color:black;"
          :class="selectSuffixIconMap[iconNum]?'suffix-icon':'suffix-icon suffix-icon-down'"
    >⬇️</span>
</template>
<script>
    import { selectSuffixIconMap } from '../utils/select';
    //    选择框的下拉标志
    export default {
        props: ['iconNum'],
        data(){
            return {
                selectSuffixIconMap,
            };
        },
        created(){
            if (this.selectSuffixIconMap[this.iconNum] === undefined) {
                this.selectSuffixIconMap[this.iconNum] = false;
            }
        }
    };
</script>
<style>
    .suffix-icon {
        transition: .3s;
    }
    
    .suffix-icon.suffix-icon-down {
        transform: rotateZ(-180deg);
    }
</style>