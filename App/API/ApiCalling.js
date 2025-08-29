export const POSTAPICALLWITHIMAGE = async (url, data,) => {
  console.log('Form data',JSON.stringify(data) );
  try {
    const res = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body:data,
    })
      .catch(error => {
        return error;
      });
    const finalResult = await res?.json();
    return finalResult;
  } catch (error) {
    return error;
  }
};
export const POSTAPICALL = async (url, data,) => {
  console.log('Form data', data);
  try {
    const res = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:data,
    })
      .catch(error => {
        return error;
      });
    const finalResult = await res?.json();
    return finalResult;
  } catch (error) {
    return error;
  }
};
export const POSTAPICALLFORMDATA = async (url, data, multipart,token='') => {
  console.log(data)
  try {
    const res = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': multipart ? 'multipart/form-data' : 'application/json',
        //  Authorization: `Bearer ${token}`,
      },
      body: data,
    })
      .catch(error => {
        return error;
      });

    const finalResult = await res?.json();
    // console.log("finalResult==========",finalResult)
    return finalResult;
  } catch (error) {
    return error;
  }
};
export const POSTAPICALLFORCONFIRMCHALLENGE = async (url, data, multipart='',) => {
  // console.log(data)
  try {
    const res = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': multipart ? 'multipart/form-data' : 'application/json',
        //  Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .catch(error => {
        return error;
      });
      // console.log('res>>>>>>>>>>>>>>>>>>>',res)
    const finalResult = await res?.json();
    return finalResult;
  } catch (error) {
    return error;
  }
};
export const POSTAPICALLTOKEN = async (url, data, multipart,token) => {
  console.log(JSON.stringify({users:data}),) 
  try {
    const res = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': multipart ? 'multipart/form-data' : 'application/json',
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({user:data}),
    })
      .catch(error => {
        return error;
      });
    const finalResult = await res?.json();
    return finalResult;
  } catch (error) {
    return error;
  }
};

export const GETAPICALL = async (url) => {
  try {
    const res = await fetch(`${url}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      },
      //   body: data,
    })
      
      .catch(error => {
        return error;
      });
    const finalResult = await res?.json();
    return finalResult;
  } catch (error) {
    return error;
  }
};


