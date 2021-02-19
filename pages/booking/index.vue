<template>
  <div>
    <v-container class="pt-0 pb-0">
      <v-row>
        <v-col cols="12">
          <div class="mt-7 text-primary text-title text-center">ระบบผู้มาติดต่อ</div>
        </v-col>

        <v-col v-for="(item, i) in items" :key="i" cols="12">
          <v-card :color="item.color" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="headline" v-text="item.title"></v-card-title>

                <v-card-subtitle v-text="item.artist"></v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    color="white"
                    elevation="2"
                    large
                    outlined
                    width="100px "
                    @click="next(item.id)"
                  >เลือก</v-btn>
                </v-card-actions>
              </div>

              <v-avatar class="ma-3" size="125" tile>
                <v-img :src="item.src"></v-img>
              </v-avatar>
              <p></p>
            </div>
          </v-card>
        </v-col>

        <v-text-field class="mt-2" v-model="uuiduser" name="uuiduser" label="UUID" dense disabled></v-text-field>

        <div class="mt-5 w-100 text-orange text-center my-btn" @click="close_liff">ยกเลิกรายการ</div>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      items: [
        {
          id: 1,
          color: "#1F7087",
          src: require("@/assets/img/icons8-add-user-male-100.png"),
          title: "ลงทะเบียนผู้มาติดต่อ"
        },
        {
          id: 2,
          color: "#952175",
          src: require("@/assets/img/icons8-qr-code-100.png"),
          title: "เรียกดู QRcode"
        }
      ],
      uuiduser: ""
    };
  },
  methods: {
    ...mapActions({
      setInfoBookgin: "booking/setInfoBookgin"
    }),
    close_liff() {
      liff.closeWindow();
    },
    next(obj) {
      switch (obj) {
        case 1:
          this.$router.push("/booking/register");
          break;

        case 2:
          this.$router.push("/booking/history");
          break;

        default:
          break;
      }
    },
    setdata_user() {
      this.setInfoBookgin({ uuiduser: this.uuiduser });
    }
  },

  mounted() {
    // this.uuiduser = "U2a9a887f26eb7200dd52e97a04c13d1b";
    // this.setdata_user();
    liff
      .init({
        liffId: "1655629534-o29p867k"
      })
      .then(() => {
        if (liff.isLoggedIn()) {
          liff.getProfile().then(profile => {
            this.uuiduser = profile.userId;
            this.setdata_user();
          });
        } else {
          liff.login();
        }
      });
  }
};
</script>

<style lang="scss" scoped>
.v-form {
  padding: 0 10px;
}
</style>
