import { setSingleCompany } from '@/redux/companySlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch()
    useEffect(()=> {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/v1/company/get/${companyId}`, {withCredentials:true})
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company))
                }
            } catch (error) {

             console.log(error);
                
            }
        }
        fetchSingleCompany();
    },[companyId, dispatch])
}

export default useGetCompanyById;
