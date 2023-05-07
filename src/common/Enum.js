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
    duplicate: 5,
    errorImg: 6,
    errorDuplicateService: 7,
    errors: 8,
}
