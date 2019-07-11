<template>
    <GridLayout class="root" width="100%" height="100%">

        <StackLayout class="finishedDisplay" verticalAlignment="center">
            <Image class="checkedImage" src="~/assets/icons/checked_orange.png"/>
            <label class="confirmedText" :text="'Your order was successfully placed\nThank you for shopping with us'" textWrap="true" />
            <label :text="'Order id: ' + orderId" />
        </StackLayout>

        <Ripple class="button" verticalAlignment="bottom">
            <Button text="Home" elevation="0" width="100%" padding="0" @tap="$goTo('home')"/>
        </Ripple>

    </GridLayout>
</template>

<script>
export default {
    props: {
        orderId: {
            default: 0,
        }
    }
}
</script>


<style lang="scss" scoped>
@import '~/styles/vars';

.root{
    padding: 10;
}
.finishedDisplay{
    text-align: center;
    margin-top: -80;
}
.checkedImage{
    width: 70;
    height: 70;
}
.confirmedText{
    margin-top: 20;
    font-size: 17;
    color: $primary-color;
    font-weight: bold;
}
.button{
    height: 50;
    margin-top: 30;
    button{
        background-color: #f2f2f2;
        border-color: #fdfdfd;
        color: #888;
        border-width: 1;
        border-radius: 4;
        font-size: 18;
    }
}
</style>
