<div>
    <input
        type={this.$t('0')}
        placeholder={this.$t('1')}
        value={`s ${this.$t('2')} f`}
    />

    <MyComponent>
        {`${this.$t('3')} `}<header slot="header">{this.$t('4')}</header>{` ${this.$t('3')}`}
        {`${this.$t('3')} `}<footer slot="footer">{this.$t('5')}</footer>{` ${this.$t('3')}`}
    </MyComponent>
</div>

test(this.$t('6'))