import axios from "axios";

export async function getAllFood()
{   
    try 
    {
        let res = await axios.get('https://localhost:44340/api/v1/Foods')
        return res;
    }catch(error) {
        return error.response.status;
    }    
}

export async function filterFood(listFilter,filterLimit, filterPage, filterSort)
{   
    try 
    {
        let data = {
            Filters: listFilter,
            Limit: filterLimit,
            Page: filterPage,
            Sort: filterSort,
        }
        let res = await axios.post('https://localhost:44340/api/v1/Foods/filter',data)
        return res;
    }catch(error) {
        return error.response.status;
    }    
}

export async function getNewCode(name)
{   
    try 
    {
        let res = await axios.get(`https://localhost:44340/api/v1/Foods/new-code?name=${name}`)
        return res;
    }catch(error) {
        return error.response.status;
    }    
}

export async function getFoodByID(id)
{   
    try 
    {
        let res = await axios.get(`https://localhost:44340/api/v1/Foods/${id}`)
        return res;
    }catch(error) {
        return error.response.status;
    }    
}

export async function checkDuplicateCode(id,code)
{   
    try 
    {
        let res = await axios.get(`https://localhost:44340/api/v1/Foods/duplicate-code?foodID=${id}&foodCode=${code}`)
        return res;
    }catch(error) {
        return error.response.status;
    }    
}


