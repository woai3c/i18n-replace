<template>
    <div>
        <!-- 一 -->
        <div :value="$t('10001')" :val="abc + $t('10002') + ' afb'">{{ $t('10000') }}</div>
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
        const test = this.$t('0')
    }
}
</script>

<style>

</style>