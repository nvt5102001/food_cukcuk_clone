import axios from "axios";

export async function getAllService()
{   
    try 
    {
        let res = await axios.get('https://localhost:44340/api/v1/ServiceHobbys')
        return res;
    }catch(error) {
        return error.response.status;
    }    
}

export async function getServiceByID(foodId)
{   
    try 
    {
        let res = await axios.get(`https://localhost:44340/api/v1/ServiceHobbys/list-service-byid?foodID=${foodId}`)
        return res;
    }catch(error) {
        return error.response.status;
    }    
}