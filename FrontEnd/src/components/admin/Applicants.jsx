import React, { useEffect } from 'react'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

const Applicants = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { applicants } = useSelector(store => store.application)
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
        console.log(res.data)
        dispatch(setAllApplicants(res.data.job))
      } catch (error) {
        console.log(error);

      }
    }
    fetchAllApplicants();
  }, [])

  return (
    <div className='mt-[69px] max-w-7xl  mx-auto'>
      <div>
        <h1>Applicants <span className='text-red-700 font-bold'>({applicants?.applications?.length})</span></h1>
        <ApplicantsTable />
      </div>
    </div>
  )
}

export default Applicants