import axios from 'axios';
import { toast } from 'react-toastify';

const notify = (message?:string, action?:'success' | 'error') => toast[action || 'success'](message || "Success Notification !", {
    position: toast.POSITION.TOP_RIGHT
});

const callApi = async (url: string, params: any, method: string, displayMessage: boolean): Promise<any> => {

    const data: any = {
        data: null,
        error: null
    }


    const client = axios.create({
        baseURL: "",
        data: params
    });

    if (method === 'post') {
        await client.post(url, params).then((res) => {
            data.data = res.data;
            notify('Operation completed successfully')


        }).catch((error) => {
            if (error.response?.data?.fieldErrors) {
                const errorData = error.response?.data;
                for (const key of Object.keys(errorData.fieldErrors)) {
                    notify(key + " : " + errorData.fieldErrors[key][0], 'error')
                }

            }
            else {
                data.error = { message: error.response.error }
                notify(data.error, 'error')
            }

        })
    } 
    else if (method === 'get') {
        displayMessage && notify()
        await client.get(url, {
            params: {
                ...(Object.keys(params).length && { ...params })
            }
        }).then((res) => {
            data.data = res.data
        }).catch((error) => {
            if (error.response) {
                data.error = { message: error.response.data.message }
            }
            else {
                data.error = { message: "Error Occured" } //error.message
            }
        })
    }
  
    return data
}

export default callApi;

