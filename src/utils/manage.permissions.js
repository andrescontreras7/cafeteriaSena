
export const adminPermissions = (rolId) => {
    if (rolId != 1) {
        return false
        
    }else{

        return true
    }
}

export const EmplPermissions = (rolId) => {
    if (rolId != 2) {
        return false
        
    }else{
        return true
    }
}

export const ClientPermissions = (rolId) => {
    if (rolId != 3) {
        return false
        
    }else{
        return true
    }
}