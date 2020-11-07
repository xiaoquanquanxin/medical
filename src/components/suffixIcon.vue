<template>
    <span style="color:black;"
          :class="selectSuffixIconMap[iconNum]?'suffix-icon':'suffix-icon suffix-icon-down'"
    >
        <img :src="suffixIconImg" alt="">
        ️</span>
</template>
<script>
    import { selectSuffixIconMap } from '../utils/select';

    import suffixIconImg from '@/assets/suffixIcon.png';
    //    选择框的下拉标志
    export default {
        props: ['iconNum'],
        data(){
            return {
                suffixIconImg,
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
        transform: rotateZ(-180deg);
        transition: .3s;
    }
    
    .suffix-icon.suffix-icon-down {
        transform: rotateZ(0);
    }
</style>