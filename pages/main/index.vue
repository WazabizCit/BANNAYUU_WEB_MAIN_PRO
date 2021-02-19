<template>
  <div style="background-color: #2d2f3c; height: 100%;">
    <v-container class="pt-0 pb-0">
      <v-row class="mt-10 mb-10" align="center" justify="center">
        <v-col cols="12">
          <v-card color="card_success" class="mx-auto" max-width="400" raised>
            <v-list-item three-line>
              <v-img
                class="mt-5 mr-5"
                max-width="80"           
                contain
              ></v-img>
              <v-list-item-content>
                <div class="text-title-card mb-1 mt-2 mr-2 ml-1 text-white">ระบบจองที่จอดรถยนต์ VIP</div>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="text-button"
                color="white"
                elevation="2"
                large
                outlined
                width="100px"               
              >เลือก</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card color="card_blue" class="mx-auto" max-width="400" raised>
            <v-list-item three-line>
              <v-img
                class="mt-5 mr-5"
                max-width="100"               
                contain
              ></v-img>
              <v-list-item-content>
                <div class="text-title-card mb-1 mt-2 mr-2 ml-1 text-white">ระบบสมาชิกจอดรถรายเดือน</div>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="text-button"
                color="white"
                elevation="2"
                large
                outlined
                width="100px"              
              >เลือก</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card color="card_teal" class="mx-auto" max-width="400" raised>
            <v-list-item three-line>
              <v-img
                class="mt-5 mr-5"
                max-width="80"              
                contain
              ></v-img>
              <v-list-item-content>
                <div class="text-title-card mb-1 mt-2 mr-2 ml-1 text-white">วิธีการใช้งาน</div>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="text-button"
                color="white"
                elevation="2"
                large
                outlined
                width="100px"               
              >เลือก</v-btn>
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
   
  }
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
}
</style>
