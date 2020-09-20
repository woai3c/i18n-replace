<template>
    <div>
        <!-- 一 -->
        <div :value="$t('0')" :val="abc + $t('1') + ' afb'">{{ $t('2') }}</div>
    </div>
</template>

<script>
export default {
    // 二
    /** 
     * 一
     * 二
     * 三
    */
    created() {
        const test = this.$t('3')
    }
}
</script>

<style>

</style>