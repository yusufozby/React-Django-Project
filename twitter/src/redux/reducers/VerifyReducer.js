


const initialState = {
    message:'',
    err:true

    }


export const verifyReducer = (state=initialState,action) => {
    switch (action.type) {
      case "SUCCESS":
        return {...state,err:false,message:'Kullanıcı başarıyla oluşturuldu'}
    default: 
    return state;
    }
}