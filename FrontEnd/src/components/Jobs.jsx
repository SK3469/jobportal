import React, { useEffect, useState } from 'react'
import FilterCard from './FilterCard'
import Job from './Job'
import { SpaceIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import { motion } from 'framer-motion'

// const JobArray = [
//   1, 2, 3, 4, 5, 6, 7, 8]
const Jobs = () => {

  const { allJobs, searchedQuery } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
      })
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs)
    }
  }, [allJobs, searchedQuery])
  return (
    <div className='max-w-7xl m-auto mt-[69px] mb-[69px] '>
      <div className=' flex gap-3 '>
        <div className='w-20% '>
          <FilterCard />
        </div>
        {
          filterJobs.length <= 0 ? <span>Job Not Found.</span> : (
            <div className='flex-1 h-[100vh] overflow-y-auto pb-5'>
              <div className='grid grid-cols-3 gap-4'>
                {
                  filterJobs?.map((job) => (
                    <motion.div
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      key={job?._id}>
                      <Job job={job} />
                    </motion.div>
                  ))
                }
              </div>

            </div>
          )

        }
      </div>
    </div>
  )
}

export default Jobs