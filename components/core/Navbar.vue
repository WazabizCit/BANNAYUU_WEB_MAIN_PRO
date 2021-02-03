<template>
  <div>
    <v-toolbar color="success" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>MRT Parking</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn class="btn-bar" text @click="open_dialog_contact">ติดต่อเรา</v-btn>     
      <v-btn icon @click="logout">
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer temporary app v-model="drawer">
      <router-link to="/mainweb" exact>       
      </router-link>
      <v-list shaped class="pt-0 pb-0">
        <v-list-item
          class="text-munu"
          v-for="menu in menus"
          :key="menu.text"
          router
          :to="menu.route"
          color="primary"
        >
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ menu.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-dialog v-model="dialog_contact" max-width="500px">
      <v-card>
        <v-card-title class="text-success">ติดต่อเรา</v-card-title>
        <v-card-text>
          <div class="text-sub-black">สถานีแยก คปอ.</div>
          <div class="text-sub-title mt-1">โทร : 061 734 0202</div>
          <v-btn class="mt-1" color="warning" @click="open_map_n23">
            <v-icon left>mdi-map-marker-outline</v-icon>ที่ตั้งอาคาร
          </v-btn>
          <div class="text-sub-black mt-4">สถานีคูคต.</div>
          <div class="text-sub-title mt-1">โทร : 061 705 0404</div>
          <v-btn class="mt-1" color="warning" @click="open_map_n24">
            <v-icon left>mdi-map-marker-outline</v-icon>ที่ตั้งอาคาร
          </v-btn>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange" text @click="close_dialog_contact">ปิด</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    version() {
      return "1.0";
    }
  },
  data() {
    return {
      dialog_contact: false,
      selectedMenu: 0,
      menus: [
        { icon: "mdi-home ", text: "หน้าหลัก", route: "/mainweb" },
        {
          icon: "mdi-card-account-details-outline",
          text: "ระบบ Member",
          route: "/sys_member"
        },
        { icon: "mdi-qrcode", text: "ระบบ จองที่จอด", route: "/sys_booking" },
        { icon: "mdi-help-box", text: "คำแนะนำ", route: "/help" }
      ],
      drawer: null
    };
  },
  methods: {
    async logout() {
      try {
        await this.$auth.logout();
        this.$router.push("/login");
        this.$store.dispatch("setStatusnavbar", 0);
      } catch (err) {
        console.log(err);
      }
    },
    open_dialog_contact() {
      this.dialog_contact = true;
    },
    close_dialog_contact() {
      this.dialog_contact = false;
    },
    open_map_n23() {
      window.open(
        "https://www.google.co.th/maps/place/%E0%B8%AD%E0%B8%B2%E0%B8%84%E0%B8%B2%E0%B8%A3%E0%B8%88%E0%B8%AD%E0%B8%94%E0%B9%81%E0%B8%A5%E0%B9%89%E0%B8%A7%E0%B8%88%E0%B8%A3+%E0%B8%AA%E0%B8%96%E0%B8%B2%E0%B8%99%E0%B8%B5%E0%B9%81%E0%B8%A2%E0%B8%81+%E0%B8%84%E0%B8%9B%E0%B8%AD./@13.9244269,100.6235534,17z/data=!4m8!1m2!2m1!1zQlRTIOC5geC4ouC4geC4hOC4m-C4rQ!3m4!1s0x0:0xf92457d6d7e707f4!8m2!3d13.9256558!4d100.6252324"
      );
    },
    open_map_n24() {
      window.open(
        "https://www.google.co.th/maps/place/%E0%B8%AD%E0%B8%B2%E0%B8%84%E0%B8%B2%E0%B8%A3%E0%B8%88%E0%B8%AD%E0%B8%94%E0%B9%81%E0%B8%A5%E0%B9%89%E0%B8%A7%E0%B8%88%E0%B8%A3+%E0%B8%AA%E0%B8%96%E0%B8%B2%E0%B8%99%E0%B8%B5%E0%B8%84%E0%B8%B9%E0%B8%84%E0%B8%95/@13.9314621,100.6452546,19.26z/data=!4m12!1m6!3m5!1s0x311d7d9b50066ab7:0xa2e5d5a77e62c129!2z4Lit4Liy4LiE4Liy4Lij4LiI4Lit4LiU4LmB4Lil4LmJ4Lin4LiI4LijIOC4quC4luC4suC4meC4teC4hOC4ueC4hOC4lQ!8m2!3d13.9316035!4d100.6456011!3m4!1s0x311d7d9b50066ab7:0xa2e5d5a77e62c129!8m2!3d13.9316035!4d100.6456011"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.v-list-item__icon {
  align-self: center;
  margin: 0 0;
}
</style>
