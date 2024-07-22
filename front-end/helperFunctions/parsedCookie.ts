
export default function parsedCookie(cookies) {
    const parameters = {token: "null", _id:"null"}

    cookies.split(";").forEach((str) => {
        let splitted = str.split("=");
        if(splitted[0]==="token" || splitted[0]===" token")parameters.token = splitted[1]
        if(splitted[0]==="_id" || splitted[0]===" _id")parameters._id = splitted[1]
    })
    parameters._id.split(' ').join('')
    parameters.token.split(' ').join('')
    console.log("params",parameters);
    
    return parameters
}