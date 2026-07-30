import axios from 'axios';


export const getUserData = (userId) => {
    return axios.get(`/api/userddata_path/${userId}`);
};
