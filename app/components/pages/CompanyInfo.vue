<template>
    <MPage title="About the company">
        <ScrollView width="100%" height="100%">
            <StackLayout class="root" width="100%">
                <label :text="text" textWrap="true"/>
            </StackLayout>
        </ScrollView>
    </MPage>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed: {
        ...mapState(['gls']),
        text(){
            return this.gls.company_info[this.$langId()];
        }
    }
}
</script>

<style lang="scss" scoped>
.root{
    padding: 10;
    text-align: left;
}
label{
    font-size: 19;
}
</style>
