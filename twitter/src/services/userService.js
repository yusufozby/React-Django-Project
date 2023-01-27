import axios from "axios"





export const createUser = async (account) => {
    const newAccount = new FormData();

     newAccount.append('username',account.username);
     newAccount.append('password',account.password);
     newAccount.append('email',account.email);
    newAccount.append('profileImg',account.profileImg);
   
    newAccount.append('Address',account.Address);
    newAccount.append('accountName',account.accountName);
    newAccount.append('mySharings',account.mySharings);
    newAccount.append('description',account.description);
  
    await axios.post("http://localhost:8000/api/createuser/",new URLSearchParams(newAccount)).then((res)=>console.log(res.data));
}




