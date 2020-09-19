<div>
    <input
        type={this.$t('10001')}
        placeholder={this.$t('10000')}
        value={`s ${this.$t('10003')} f`}
    />

    <MyComponent>
    {`${this.$t('0')} `}<header slot="header">{this.$t('1')}</header>{` ${this.$t('0')}`}
        {`${this.$t('0')} `}<footer slot="footer">{this.$t('2')}</footer>{` ${this.$t('0')}`}
    </MyComponent>
</div>