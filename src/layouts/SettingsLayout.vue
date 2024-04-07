<template>
<div>
<NavbarMain></NavbarMain>
<SettingsMain></SettingsMain>
<FooterMain />
</div>
</template>
<script>
import NavbarMain from "../components/main/NavbarMain.vue"
import SettingsMain from "../views/settings/SettingsMain.vue";
import FooterMain from "../components/main/FooterMain.vue";

export default {
components:{
        NavbarMain,
        SettingsMain,
    FooterMain
}
};
</script>