<template>
  <div>
    <v-container class="pt-0 pb-0">
      <v-row class="mt-10">
        <v-col cols="12">
          <v-card max-width="344" class="mx-auto" raised>
            <v-list-item-content class="justify-center">
              <v-img
                class="mt-2"
                :src="require('~/assets/img/img_checked_success.svg')"
                contain
                max-width="60"
              ></v-img>
              <div class="text-success headline text-center mt-3">ทำรายการสำเร็จ</div>
              <v-list-item-subtitle class="text-center mt-2">ลูกค้าทำรายการสำเร็จ</v-list-item-subtitle>
              <v-list-item-subtitle class="text-center">กรุณากดปุ่มกลับสู่หน้าหลักเพื่อทำรายการต่อ</v-list-item-subtitle>
            </v-list-item-content>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="text-center" color="primary" @click="next">กลับสู่หน้าหลัก</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({}),

  methods: {
    next() {
      this.$router.push("/booking/history");
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.v-card__actions {
  align-items: center;
  display: flex;
  padding: 20px;
}
.text-title {
  font-size: 18px;
  font-weight: bold;
  color: green;
}
</style>
