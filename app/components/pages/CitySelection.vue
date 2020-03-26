<template>
    <Page actionBarHidden="true" ref="page">
        <!-- <FilterableListpicker ref="citiesList" :source="_cities" /> -->
        <AbsoluteLayout width="100%" height="100%">
            <StackLayout width="100%" height="100%">
                <GridLayout class="segment" width="100%" height="50%" padding="0 20 20 20">
                    <Image src="~/assets/images/slogo.png" width="100%" horizontalAlignment="center" marginBottom="10"/>
                    <label text="Select your city" textWrap="true" class="text"
                        horizontalAlignment="center" verticalAlignment="bottom" height="80"/>
                </GridLayout>
                <GridLayout rows="*, 40" class="segment" width="100%" height="50%" marginTop="-50" horizontalAlignment="center">

                    <StackLayout row="0" horizontalAlignment="center" verticalAlignment="center">

                        <Spinner v-if="loading"/>
                        <template v-else>

                            <StackLayout class="form_field" scaleX="0.9" scaleY="0.9">
                                <label class="title" text="City"/>
                                <CardView elevation="2" class="field_input" radius="50">
                                    <FilterableListpicker v-model="selectedCity" :items="cities" textProp="name_1" text="Select City" searchHint="Search cities" />
                                </CardView>
                            </StackLayout>

                            <StackLayout class="form_field" :width="showRegions ? '60%' : '0'" scaleX="0.9" scaleY="0.9">
                                <label class="title" text="Region"/>
                                <CardView elevation="2" class="field_input" radius="50">
                                    <FilterableListpicker v-model="selectedRegion" :items="regions" textProp="name_1" text="Select Region" searchHint="Search regions" />
                                </CardView>
                            </StackLayout>

                        </template>

                    </StackLayout>

                    <SolidButton v-if="!loading" row="1" class="submit" @tap="submit" text="Continue"
                        backgroundColor="#F36F24" color="white" radius="6" />

                </GridLayout>
            </StackLayout>
        </AbsoluteLayout>
    </Page>
</template>

<script>
import CitiesLogic from '~/logic/cities';
import { mapState } from 'vuex';
import FilterableListpicker from '../complex/FilterableListPicker';

export default {
    components: {
        FilterableListpicker
    },
    data: () => ({
        loading: true,
        showRegions: false,
        selectedCity: null,
        selectedRegion: null,
        regions: [],
        cities: [],
    }),
    watch: {
        selectedCity(){
            this.selectedCityChanged()
        }
    },
    methods: {
        submit(){
            const city = this.selectedCity;
            const region = this.showRegions ? this.selectedRegion : null;
            if(!city){
                this.$alert('Please select a city.');
                return;
            }
            if(this.showRegions && !region){
                this.$alert('Please select a region.');
                return;
            }
            const regionId = region ? region.city_id : 0;
            if(CitiesLogic.selectStore(city.city_id, regionId)){
                this.$starter.nextStep('citySelection');
            }else{
                this.errorMsg();
            }
        },
        selectedCityChanged(){
            this.updateRegions();
        },

        updateRegions(){
            const city = this.selectedCity;
            if(!city) return;
            const regions = city.childs;
            if(regions.length){
                this.selectedRegion = null;
                this.regions = regions;
                this.showRegions = true;
            }else{
                this.showRegions = false;
            }
        },

        loadData(){
            CitiesLogic.loadData()
            .then(cities => {
                this.cities = cities;
                this.loading = false;
            })
            .catch(err => {
                this.errorMsg();
            })
        },

        errorMsg(){
            this.$alert('Something went wrong, Please try again');
        }
    },

    mounted(){
        this.loadData();

        // setTimeout(() => {
        //     console.log('It got called');
        //     this.$refs.citiesList.nativeView.show(this.$refs.page.nativeView);
        // }, 3000)
    }
}
</script>


<style lang="scss" scoped>
@import '~/styles/vars';
.text{
    font-size: 20;
    color: #777;
    text-align: center;
}
.lbtn_parent{
    margin-bottom: 10;
}

.title{
    width: 100%;
    font-size: 18;
    margin-bottom: 4;
    text-align: center;
    color: #666;
}
.form_field{
    width: 60%;
    margin-bottom: 14;
    padding: 0;
    .field_input{
        margin: 2;
    }
    .dropdown{
        font-size: 20;
        padding: 6 6 6 12;
        background-color: #f5f5f5;
    }
}
.submit{
    width: 50%;
}
</style>
