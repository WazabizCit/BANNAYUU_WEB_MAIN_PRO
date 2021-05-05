<template>
  <div color="card_primary">
    <v-container class="pt-0 pb-0">
      <v-row>
        <v-col cols="12">
          <div class="mt-7 text-primary text-title text-center">ข่าวสาร</div>
        </v-col>
      </v-row>

      <v-row align="center" justify="center">
        <v-col v-for="item in items_list" :key="item.hni_id" cols="12">
          <v-card class="mx-auto mt-2" max-width="364" raised>
            <v-card-title>
              <v-icon large left>mdi-newspaper-variant-outline</v-icon>
              <div>วันที่ประกาศ {{item.hni_start_datetime}}</div>
            </v-card-title>
            <v-card-text>
              <p class="title text--primary">{{item.hni_header_text}}</p>
              <div class="text--primary">{{item.hni_detail_text}}</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                v-if="item.hni_link_text != null "
                color="primary"
                @click="openlink(item.hni_link_text)"
              >Link</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="mt-5" cols="12"></v-col>
      </v-row>

      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>

      <div v-if="status_show">
        <v-row class="mt-10">
          <v-col class="text-center" cols="12">
            <v-icon class="v-icon-size">mdi-note-text-outline</v-icon>
          </v-col>
          <v-col class="text-center text-primary" cols="12">ไม่มีข้อมูล</v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      status_show: false,
      overlay: false,
      txt_dialog_title: "",
      txt_dialog_sub: "",
      uuiduser: "",
      items_list: []
    };
  },
  methods: {
    openlink(link) {
      window.open(link, "_blank");
    },
    async requestData() {
      this.overlay = true;
      this.items_list = [];
      this.$axios
        .$post("actionnotification/get_list_notification", {
          m_uuiduser: this.uuiduser,
          m_company_id: process.env.company_id
        })
        .then(res => {
          this.overlay = false;
          if (res.data == null) return (this.status_show = true);
          if (res.data.length == 0) {
            this.status_show = true;
          } else {
            this.status_show = false;
            this.items_list = res.data;
          }
        })
        .catch(error => {
          this.overlay = false;
          this.status_show = false;
        })
        .finally();
    }
  },
  mounted() {


    liff
      .init({
        liffId: process.env.liffid_notification
      })
      .then(() => {
        if (liff.isLoggedIn()) {
          liff.getProfile().then(profile => {
            this.uuiduser = profile.userId;
            this.requestData();

          });
        } else {
          liff.login();
        }
      });
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.v-form {
  padding: 0 10px;
}
.v-icon-size {
  font-size: 80px;
  padding: 0 15px;
}
</style>
