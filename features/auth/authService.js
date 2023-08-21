import axios from 'axios';

const API_URL = 'https://27df-196-207-134-81.ngrok-free.app/api/v1/auth';

const authService = {
  login: async (email, password, navigation) => {
    console.log("this is ffrom service ",email,password)
    try {    
      const response = await axios.post(`${API_URL}/login`, {
        email: email,
        password: password,
      });
      console.log(response)
      if (response.data.status == "ok") {
        console.log("we are okkkkk")
        navigation.navigate("Dailpass");


             
        //localStorage.setItem('user', JSON.stringify(response.data));
      } else {
        console.log("we are here ")
        console.log(response.data)
        throw new Error(response.data.message || 'Login failed');
      }
      console.log(response)


      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getUser: async (navigation,location) => {
    try {    
      const response = await axios.get(`${API_URL}/user`);
      console.log(response.data.data)
      if (response.data.status == "ok") {
        console.log("we are okkkkk")
        console.log(location)
        navigation.navigate(location);


             
        //localStorage.setItem('user', JSON.stringify(response.data));
      } else {
        console.log(response.data)
        throw new Error(response.data.message );
      }
      console.log(response)


      return response.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  


  logout: () => {
    localStorage.removeItem('user');
  },
};

export default authService;
