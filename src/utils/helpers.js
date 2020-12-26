import {storage} from "../firebase";

export const convertToArray = data =>{
    let array =[];
    data.map(r=>{
        array.push({...r.data(),id:r.id});
    });
    return array;
}
export const filterbyUserIdinMemberIds = ()=>{
    
}
export const MappedElement = ({data, renderElement}) => {
    if (data && data.length) {
        return data.map((obj, index, array) => renderElement(obj, index, array));
    }
    return null;
};
export const getImage = async (image,CB) =>{
    await storage.child(image).getDownloadURL().then((url) => {
        CB(url);
    }).catch((error) => {
      CB('')
    })
};
export const convertDBSnapshoptToArrayOfObject = (snapshot)=>{
    let arr =[];
    Object.entries(snapshot.val()).forEach(it=>{
        arr.push({id: it[0],...it[1]})
    })
    return arr;
}

export const getFormattedDate=(initialDate) =>{
    var date = new Date(initialDate);
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    return str;
}