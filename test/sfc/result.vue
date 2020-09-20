<template>
    <div>
        {{ $t('0') }}<div :value="$t('1')" :val="abc + $t('2') + ' afb'">{{ $t('3') }}</div>{{ $t('4') }}
    </div>
</template>

<script>
export default {
    created() {
        const test = this.$t('5')
    }
}
</script>

<style>

</style>