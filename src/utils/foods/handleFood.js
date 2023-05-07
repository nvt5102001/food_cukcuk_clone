import axios from "axios";

export async function InsertFood(food, listService) {
    let data = {
        food: food,
        serviceHobbies: listService
    }
    let res = await axios.post('https://localhost:44340/api/FoodDetails', data)
    return res;
}

export async function UpdateFood(id, food, listService) {
    try {
        let data = {
            food: food,
            serviceHobbies: listService
        }
        let res = await axios.put(`https://localhost:44340/api/FoodDetails/${id}`, data)
        return res;
    } catch (error) {
        return error.response.status;
    }
}


export async function DeleteFood(ids) {
    try {
        let res = await axios.delete(`https://localhost:44340/api/v1/Foods`, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(ids)
        })
        return res;
    } catch (error) {
        return error.response.status;
    }
}

export async function UploadImage(file) {
    let data = new FormData();
    data.append('fileImage', file);

    let res = await axios.post(`https://localhost:44340/api/v1/Foods/upload-image`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return res;
}


export async function deleteImageOld(imageName) {
    try {
        let res = await axios.post(`https://localhost:44340/api/v1/Foods/remove-image?fileName=${imageName}`)
        return res;
    } catch (error) {
        return error.response.status;
    }
}