<template>
  <div>
    <v-container class="pt-0 pb-0">
      <v-row>
        <v-col cols="12">
          <div class="mt-7 text-primary text-title text-center">ระบบผู้มาติดต่อ</div>
        </v-col>

        <v-col v-for="(item, i) in items" :key="i" cols="12">
          <v-card v-if="!status_close_process" :color="item.color" dark class="mx-auto"    max-width="344" >
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
                    width="100px"
                    @click="next(item.id)"
                  >เลือก</v-btn>
                </v-card-actions>
              </div>
              <v-spacer></v-spacer>

              <v-avatar class="ma-3" size="95" tile>
                <v-img :src="item.src"></v-img>
              </v-avatar>
              <p></p>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <Card_close_process :status_close_process="status_close_process" />

      <div hidden class="mt-5 w-100 text-orange text-center my-btn" @click="close_liff">ยกเลิกรายการ</div>

      <v-row>
        <v-col class="mt-5" cols="12"></v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Card_close_process from "@/components/closeprocess_component/card_close_process";

export default {
  data() {
    return {
      status_close_process: false,
      items: [
        {
          id: 1,
          color: "#008cff",
          src: require("@/assets/img/ic_img_contact.svg"),
          title: "ลงทะเบียนผู้ติดต่อ"
        },
        {
          id: 2,
          color: "#084c79",
          src: require("@/assets/img/ic_img_qrcode.svg"),
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
    },
    async requestData() {
      this.$axios
        .$post("booking/check_status_booking", {
          m_uuiduser: this.uuiduser,
          m_company_id: process.env.company_id,
          m_promotion: process.env.promotion_code
        })
        .then(res => {
          switch (res.message) {
            case "success":
              this.status_close_process = false;
              break;

            default:
              this.status_close_process = true;
              break;
          }
        })
        .catch(error => {
          this.status_close_process = true;
        })
        .finally();
    }
  },

  mounted() {



    liff
      .init({
        liffId: process.env.liffid_bookgin
      })
      .then(() => {
        if (liff.isLoggedIn()) {
          liff.getProfile().then(profile => {
            this.uuiduser = profile.userId;
            this.setdata_user();
            this.requestData();
          });
        } else {
          liff.login();
        }
      });
      
  },
  components: {
    Card_close_process
  }
};
</script>

<style lang="scss" scoped>
.v-form {
  padding: 0 10px;
}
</style>
