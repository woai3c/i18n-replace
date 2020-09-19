<template>
    <div>
        {{ $t('0') }}<div :value="$t('10001')" :val="abc + $t('10002') + ' afb'">{{ $t('10000') }}</div>{{ $t('1') }}
    </div>
</template>

<script>
export default {
    created() {
        const test = this.$t('2')
    }
}
</script>

<style>

</style>