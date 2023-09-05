
<template>
 
    <b-container > 
              <div class="col-12">
                <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
                >
                  <template slot="header">
                    <h4 class="card-title">ANDON ISSUE TYPE</h4>
                    <div class="header-row">      
                      <h5 class="card-title"></h5>        
                        <div class="button-container">
                        <a @click="fetchData" href="#" role="button" class="btn btn-secondary popover-test" title="Get data" data-content="Popover body content is set in this attribute.">Get</a>
                        <popup :edit="editissue" @save="clickAdd"/>
                         </div>
                    </div>
                  </template>
                    <div class="table-responsive">
                <table class="table-hover table-striped" >
                  <thead>
                    <tr>
                      <th class="text-center">ANDON_ISSUE_ID</th>
                      <th class="text-center">ANDON_ISSUE_TYPE_ID</th>
                      <th class="text-center">ANDON_ISSUE_NAME</th>
                      <th class="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>  
                    <tr v-for="issue in issues" :key="issue.ANDON_ISSUE_ID"> 
                      <td class="text-center">{{ issue.ANDON_ISSUE_ID }}</td>
                      <td class="text-center">{{ issue.ANDON_ISSUE_TYPE_ID }}</td>
                      <td class="text-center">{{ issue.ANDON_ISSUE_NAME }}</td>
                      <td class="text-center" >
                        <b-icon icon="x-circle" scale="1.2" variant="danger" class="mr-4"
                        
                          @click="handleDelete(issue)"
                        ></b-icon>       
                        <b-icon icon="pencil-square" scale="1.2" variant="success "      
                           v-b-modal.modal-prevent-closing               
                          @click="handleEdit(issue)"                         
                        ></b-icon>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </card>
          </div>       
           
    </b-container>
</template>

<script>
import Card from '../Cards/Card.vue';
import axios from 'axios';
import popup from './popup.vue';

export default {
 name: 'l-table',
  //name: 'todo-list-table',
  components: {
         Card,
         popup,
   },
    
    data() {
    return {
      editissue:{},
      issues: [],    
      newIssue: { // Dữ liệu mới cho ANDON issue
        ANDON_ISSUE_ID: "",
        ANDON_ISSUE_TYPE_ID: "",
        ANDON_ISSUE_NAME: "",
      },              
    };
  },
  methods: {
    clickAdd(issue){
      this.issues.push(issue)
      this.issues = response.data;


      // // const postissue = async () => {
      // //   try{
      //   // const response= await axios 
      // //   }
      // // }
      //  axios
     
      // .post(`http://115.78.94.36:10000/ANDON_ISSUES/post?str_json=${JSON.stringify(this.newIssue)}`)
      // .then(response => {
      //   // Xử lý phản hồi từ máy chủ sau khi thêm mới thành công
      //   console.log('Phần tử đã được thêm mới thành công:', response.data);
      //   // Cập nhật danh sách hiển thị bằng cách thêm phần tử mới vào mảng issues
      //   this.issues.push(response.data)
      //   // Đặt lại giá trị cho newIssue để chuẩn bị cho lần thêm mới tiếp theo
      //   // // this.newIssue = {
      //   // //   ANDON_ISSUE_ID: "",
      //   // //   ANDON_ISSUE_TYPE_ID: "",
      //   // //   ANDON_ISSUE_NAME: "",
      //   // };
      // })
      // .catch(error => {
      //   console.error('Lỗi khi thêm mới phần tử:', error);
      // });
      
    },

    handleDelete(issue) {
      // Gửi yêu cầu DELETE để xóa phần tử từ máy chủ backend
      axios.delete(`http://115.78.94.36:10000/ANDON_ISSUES/delete?id=${issue.ANDON_ISSUE_ID}`)
        .then(response => {
          // Xử lý phản hồi từ máy chủ sau khi xóa thành công
          console.log('Phần tử đã được xóa thành công:', response.data);

          // Cập nhật danh sách hiển thị bằng cách loại bỏ phần tử đã xóa
          this.issues = this.issues.filter(item => item.ANDON_ISSUE_ID !== issue.ANDON_ISSUE_ID);
        })
        .catch(error => {
          console.error('Lỗi khi xóa phần tử:', error);
        });
    },  
    handleEdit(issueedit){
        this.editissue=issueedit
        console.log(issueedit)
    },
    fetchData () {
        axios.get('http://115.78.94.36:10000/ANDON_ISSUES/get_all')
      .then(response => {
        this.issues = response.data;
      })
      .catch(error => {
        console.error('Error fetching issues:', error);
      });
    },
  },   
};
</script>

<style>
/* table{
  border: 1px solid;
} */

table {
  width: 100%;
  border-collapse: collapse;
}
th ,td {
  padding: 10px;
  text-align: left; 
}
td {
  height: 30px;  
}
.container {
  display: flex;
  justify-content: space-between;
  padding: 10px; /* Khoảng cách giữa các khung bằng padding */
}
.header-row {
  display: flex;
  align-items: center; /* Căn giữa các phần tử theo chiều dọc */
  justify-content: space-between; /* Căn các phần tử theo chiều ngang */
}

.button-container {
  display: flex;
  gap: 10px; /* Khoảng cách giữa các nút */
}
</style>