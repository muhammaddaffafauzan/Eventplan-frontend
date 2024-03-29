<template>
<div>
<NavbarMain></NavbarMain>
<SettingsMain></SettingsMain>
</div>
</template>
<script>
import NavbarMain from "../components/main/NavbarMain.vue"
import SettingsMain from "../views/settings/SettingsMain.vue";

export default {
components:{
        NavbarMain,
    SettingsMain
}
};
</script>