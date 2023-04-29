export function getDate(date){
    try {
        if (date) {
            date = new Date(date);
            let newDate = ("0" + date.getDate()).slice(-2),
                newMonth = ("0" + (date.getMonth() + 1)).slice(-2),
                newYear = date.getFullYear();

            return `${newYear}-${newMonth}-${newDate}`;
        }
    } catch (error) {
        console.log(error);
    }
}

 /**
         * Định dạng lại ngày tháng năm
         * Created by NVTHUY 20/02/2023
         */

 export function formatDate(date){
    try {
        if (date) {
            date = new Date(date);
            let newDate = ("0" + date.getDate()).slice(-2),
                newMonth = ("0" + (date.getMonth() + 1)).slice(-2),
                newYear = date.getFullYear();

                return `${newDate}/${newMonth}/${newYear}`;
        }
    } catch (error) {
        console.log(error);
    }
}
