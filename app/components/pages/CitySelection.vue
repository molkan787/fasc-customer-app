<template>
    <Page actionBarHidden="true">
        <AbsoluteLayout width="100%" height="100%">
            <StackLayout width="100%" height="100%">
                <GridLayout class="segment" width="100%" height="50%" padding="0 20 20 20">
                    <Image src="~/assets/images/slogo.png" width="100%" horizontalAlignment="center" marginBottom="10"/>
                    <label text="Select your city" textWrap="true" class="text"
                        horizontalAlignment="center" verticalAlignment="bottom" height="80"/>
                </GridLayout>
                <GridLayout rows="*" class="segment" width="100%" height="50%" marginTop="-50">

                    <StackLayout row="0" horizontalAlignment="center" verticalAlignment="center">

                        <Spinner v-if="loading"/>
                        <template v-else>
                            <StackLayout class="form_field" scaleX="0.9" scaleY="0.9">
                                <label class="title" text="City"/>
                                <CardView elevation="2" class="field_input">
                                    <DropDown class="dropdown" :items="_cities" :selectedIndex="cityIndex" 
                                    @selectedIndexChange="cityIndexChanged" hint="Select city" ref="city" borderRadius="6" />
                                </CardView>
                            </StackLayout>
                            <StackLayout class="form_field" :width="showRegions ? '60%' : '0'" scaleX="0.9" scaleY="0.9">
                                <label class="title" text="Region"/>
                                <CardView elevation="2" class="field_input">
                                    <DropDown class="dropdown" :items="_regions" :selectedIndex="regionIndex" 
                                    @selectedIndexChange="regionIndexChanged" hint="Select region" ref="region" borderRadius="6" />
                                </CardView>
                            </StackLayout>

                            <SolidButton @tap="submit" text="Continue"/>
                        </template>

                    </StackLayout>

                </GridLayout>
            </StackLayout>
        </AbsoluteLayout>
    </Page>
</template>

<script>
import CitiesLogic from '~/logic/cities';
import { mapState } from 'vuex';

export default {
    data: () => ({
        loading: true,
        showRegions: false,
        cityIndex: 0,
        regionIndex: 0,
        _cities: [
        ],
        _regions: [
        ],

        cities: [],
    }),
    methods: {
        submit(){
            const city = this.cities[this.cityIndex];
            const region = this.showRegions ? city.childs[this.regionIndex] : null;
            const regionId = region ? region.city_id : 0;
            if(CitiesLogic.selectStore(city.city_id, regionId)){
                this.$starter.nextStep('citySelection');
            }else{
                this.errorMsg();
            }
        },
        cityIndexChanged(){
            const index = this.$refs.city.nativeView.selectedIndex;
            this.cityIndex = index;
            this.updateRegions();
        },
        regionIndexChanged(){
            const index = this.$refs.region.nativeView.selectedIndex;
            this.regionIndex = index;
        },

        updateCities(){
            this._cities = this.cities.map(city => city.name_1);
            this.cityIndex = 0;
            this.updateRegions();
        },

        updateRegions(){
            const city = this.cities[this.cityIndex];
            if(!city) return;
            const regions = city.childs;
            if(regions.length){
                this._regions = regions.map(reg => reg.name_1);
                this.showRegions = true;
            }else{
                this.showRegions = false;
            }
            this.regionIndex = 0;
        },

        loadData(){
            CitiesLogic.loadData()
            .then(cities => {
                this.cities = cities;
                this.updateCities();
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
    }
}
</script>


<style lang="scss" scoped>
@import '~/styles/vars';
.text{
    font-size: 23;
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
        padding: 6;
        border-radius: 6;
        background-color: #f5f5f5;
    }
}

</style>
