import { ElMessage } from 'element-plus';
import axios from "axios";

const eventAdmin = {
    namespaced: true,
    state:{
      event_admin: []  
    },
    getters:{
        getEventAdmin: (state) => state.event_admin 
    },
    actions:{
        async fetchEventAdmin ({commit}){
            try {
                const response = await axios.get('/event/admin');
                commit('SET_EVENT_ADMIN', response.data);
                return response.data
            } catch (error) {
                console.error("Error fetching user data:", error.response.data.msg);
                ElMessage({
                    type: 'error',
                    message: 'Gagal Mereset Password: ' + (error.response.data.msg || 'Terjadi kesalahan saat mereset password. Silakan coba lagi.'),
                  });
                return false;
            }
        }
    },
    mutations:{
        SET_EVENT_ADMIN(state, eventAdmin){
            state.event_admin = eventAdmin
        }
    }
}

export default eventAdmin;