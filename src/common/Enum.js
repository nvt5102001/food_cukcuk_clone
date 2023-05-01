    /**
     * Các toán tử dùng để lọc 
     * author: NVThuy(25/04/2023)
     */
    export const operators = {
        CONTAIN: 0,
        EQUAL: 1,
        START_WITH: 2,
        END_WITH: 3,
        NOT_CONTAIN: 4,
        LESS: 5,
        BIGGER: 6,
        LESS_OR_EQUAL: 7,
        BIGGER_OR_EQUAL: 8
    }

    /**
     * Sắp xếp 
     * author: NVThuy(25/04/2023)
     */
    export const orderBy = {
        ASC: 0,
        DESC: 1,
    }

    /**
     * Kiểu form
     * author: NVThuy(25/04/2023)
     */
    export const formMode = {
        add: 1,
        update: 2,
        clone: 3,
    }

// Kiểu popup hiển thị
// CreatedBy: NVTHUY(03/03/2023)
export const typePopup = {
    delete: 1,
    validate: 2,
    store: 3,
    multipleDelete: 4,
    duplicate:5,
    errorImg: 6,
}

// Kiểu toast hiển thị
// CreatedBy: NVTHUY(03/03/2023)
export const typeToast = {
    success: 1,
    error: 2,
    info: 3,
    warning: 4,
}

// Đánh dấu sự thay đổi của input
// CreatedBy: NVTHUY(03/03/2023)
export const changeFlag = {
    noChange: 0,
    change: 1,
}

// Đánh dấu lỗi 
// CreatedBy: NVTHUY(03/03/2023)
export const errorFlag = {
    noError: 0,
    error: 1,
}