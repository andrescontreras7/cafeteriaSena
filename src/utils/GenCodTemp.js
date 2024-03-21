import speakeasy from 'speakeasy'

export const GenCodigosTemp = (tiempo)=> {

    const secret = speakeasy.generateSecret({ length: 6 });
    
    const token = speakeasy.totp({
        secret: secret.ascii,
        encoding: 'ascii',
        step: tiempo // mins duracion
    });


    const exp = Math.floor((Date.now() / 1000) + tiempo);
    const data = {
        codigo: token,
        exp: exp
    }

    return data
}