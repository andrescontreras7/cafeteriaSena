export const response = (res, status, codigo, message) => {
    if (status > 499) {
        return res.status(status).json({

            type: "error",
            code: codigo,
            message: message


        });
    } else {

        return res.status(status).json({

            type: "success",
            code: codigo,
            data: message


        });

    }

}