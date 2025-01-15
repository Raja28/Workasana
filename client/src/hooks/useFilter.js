import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


export const useFilter = () => {

    const { status, error, user, tasks, tags } = useSelector(state => state.user)
   
    const [filter, setFilter] = useState({
        projects: [],
        status: [],
        teams: [],
        tags: [],
    })

    // console.log(filter);
    

    // useEffect(() => {
    //     let data = []
    //     // sort based on projects
    //     if (filter.projects?.length > 0) {
    //         searchParams.set("projects", [...filter.projects])
    //         // setSearchParams(searchParams)

    //         // tasks.forEach(task => {
    //         //     if (filter.projects.includes(task.project.name)) {
    //         //         data.push(task)
    //         //     }
    //         // })
    //         // setRenderTask(prev => prev = data)
    //     }
    //     else {
    //         setSearchParams(searchParams.delete("projects"))
    //         setRenderTask(prev => prev = tasks)
    //     }

    //     // sort based on status
    //     if (filter.status?.length > 0) {
    //         searchParams.set("status", [...filter.status])
    //     } else {
    //         setSearchParams(searchParams.delete("status"))
    //     }
    //     setSearchParams(searchParams)

    //     const { projects, status, teams, tags } = filter

    //     if (projects.length || status.length || teams.length || tags.length) {
    //         // console.log(projects.length, status.length);

    //         setRenderTask([]);
    //         // project sort
    //         if (projects.length) {
    //             data = tasks.filter(task => projects.includes(task.project.name))
    //         } else {
    //             data = tasks
    //         }
    //         // status sort
    //         if (status.length) {
    //             data = data.filter(task => status.includes(task.status))
    //         }
    //         // team sort
    //         if (teams.length) {
    //             data = data.filter(task => teams.includes(task.team.name))
    //         }
    //         if (tags.length) {
    //             data = data.filter((task, index) => tags.includes(task.tags[0].name))
    //         }
    //         // tasks.forEach(task => {

    //         //     // if(projects.length > 0 && projects.includes(task.project.name) || status.length > 0 && status.includes(task.status)){
    //         //     //     data.push(task)
    //         //     // }

    //         //     if (projects.length > 0) {
    //         //         // projects.includes(task.project.name) ? data.push(task) : ""
    //         //         data = 
    //         //     }

    //         //     // if (status.length > 0) {
    //         //     //     status.includes(data.status) ? data.push(task) : ""
    //         //     // }
    //         // })
    //         setRenderTask(data)
    //     } else {

    //         clearFilter()
    //     }


    // }, [filter])

    // function clearFilter() {
    //     setRenderTask(tasks)
    // }

    return {filter, setFilter}
}