import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Header from "../components/common/Header"
import Footer from "../components/common/Footer"
import Sidebar from "../components/core/auth/Sidebar"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import useWindowDimensions from "../hooks/useWindowDimensions"
import { useFilter } from "../hooks/useFilter"
import { setStatus } from "../features/userSlice"

const tempTaskList = [
    {
        _id: 1,
        task: "Implement performance metrics and monitoring",
        date: "18-Sep-2024",
        owner: ["Arvind Kejriwal", "Rahul", "Shashi", "Vinod"],
        status: "To Do"
    },
    {
        _id: 2,
        task: "Review Q2 launch video outlines",
        date: "01-Oct-2024",
        owner: ["Sashi Tharor", 'Ajay'],
        status: "In Progess"
    },
    {
        _id: 3,
        task: "Put Assets to Platform",
        date: "10-Nov-2024",
        owner: ["Sonai Gandhi"],
        status: "Completed"
    },
    {
        _id: 4,
        task: "Put Assets to Platform",
        date: "10-Nov-2024",
        owner: ["Sonai Gandhi"],
        status: "Blocked"
    },
    {
        _id: 5,
        task: "Update Felicia on mobile Evergreen campaign",
        date: "10-Aug-2024",
        owner: ["Nitin Gadkari"],
        status: "To Do"
    },
    {
        _id: 6,
        task: "Review feedback from Testing team",
        date: "15-Aug-2024",
        owner: ["Piyush Goyal"],
        status: "In Progess"
    },
    {
        _id: 7,
        task: "Change footer design and content",
        date: "08-Dec-2024",
        owner: ["Amit Shah"],
        status: "Blocked"
    },
]

function Dashboard() {
    const { height, width } = useWindowDimensions();

    const { filter, setFilter } = useFilter()

    const { status, error, user, tasks, tags, filterData } = useSelector(state => state.user)
    const [renderTasks, setRenderTask] = useState(tasks)
    // console.log(tasks);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setStatus())
    }, [])



    // console.log(tasks[0].createdAt.toString().split("T")[0].split("-").reverse().join("/"));

    // const [searchParams, setSearchParams] = useSearchParams({})

    // const dispatch = useDispatch()

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


    // // useEffect(() => {
    // //     // console.log(filter);
    // //     // console.log(renderTasks.length);
    // // }, [filter])

    // function clearFilter() {
    //     setRenderTask(tasks)
    // }

    return (
        <>
            {
                width >= 770 ? (<main >
                    <section className="container-fluid container-fluid mt-4 min-vh-100" >
                        <div className="d-flex gap-3 ">
                            <div className="">
                                {width > 825 && <Sidebar setFilter={setFilter} filter={filter} />}
                            </div>
                            <div className="w-100  ">
                                <div className="border text-center">
                                    <h4 className="py-1">My Tasks</h4>
                                </div>
                                <div className="my-2">

                                    <div>
                                        <ul className="list-group">
                                            <li className="list-group-item  p-0">
                                                <div className=" d-flex align-items-center py-2">
                                                    <div className="border-end w-50 text-center fw-semibold">Task</div>
                                                    <div className="d-flex text-center w-50">
                                                        <div className="border-end text-center fw-semibold" style={{ width: "7rem" }}>Status</div>
                                                        <div className="border-end text-center fw-semibold" style={{ width: "7rem" }}>Due Date</div>
                                                        <div className="mx-auto fw-semibold">Owners</div>
                                                    </div>
                                                </div>
                                            </li>
                                            {
                                                filterData && filterData.length > 0 ?
                                                    (filterData?.map((task, index) => (
                                                        <li key={task._id} className="list-group-item p-0">
                                                            <div className="d-flex align-items-center">
                                                                <div className="w-50 border-end my-2 px-2">
                                                                    <span
                                                                        onClick={() => { navigate(`/dashboard/taskDetails/${task?._id}`) }}
                                                                        style={{ cursor: "pointer" }} className="" >
                                                                        {task.name}
                                                                    </span>
                                                                </div>
                                                                <div className="d-flex text-center px-1 w-50">
                                                                    <div className="border-end " style={{ width: "7rem" }}>{task?.status}</div>
                                                                    <div className="border-end" style={{ width: "7rem" }}>{task.dueDate}</div>
                                                                    <div className="mx-auto">
                                                                        {
                                                                            task.owners.length >= 3 ? (
                                                                                <>
                                                                                    {`${task.owners[0].firstName} ${task.owners[0].lastName}`}
                                                                                    {`, ${task.owners[1].firstName} ${task.owners[1].lastName}...`}
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    {`${task.owners[0].firstName} ${task.owners[0].lastName}`}
                                                                                    {task?.owners[1] && `, ${task?.owners[1]?.firstName} ${task?.owners[1]?.lastName}`}
                                                                                </>
                                                                            )

                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )))
                                                    :
                                                    (
                                                        filterData.length == 0 && <div className="mt-5 text-center">
                                                            <span>

                                                                No Task Available
                                                            </span>

                                                        </div>
                                                    )
                                            }
                                        </ul>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </section>
                </main>)
                    :
                    (
                        // <div>
                        <div className="container-fluid min-vh-100" >
                            <section>

                                <div className="border text-center my-3">
                                    <h4 className=" py-1">My Tasks</h4>
                                </div>
                                <div className="list-group">
                                    {
                                        filterData && filterData.length > 0 ?
                                            (filterData?.map((task, index) => (

                                                <Link to={`/dashboard/taskDetails/${task?._id}`}
                                                    key={task._id}
                                                    className="list-group-item list-group-item-action"
                                                    aria-current="true"
                                                >
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h6 className="mb-1"><strong>Task: </strong> {task.name}</h6>
                                                        {/* <small><strong>Team: </strong>
                                                        {
                                                                    task.owners.length >= 3 ? (
                                                                        <>
                                                                            {`${task.owners[0].firstName} ${task.owners[0].lastName}`}
                                                                            {`, ${task.owners[1].firstName} ${task.owners[1].lastName}...`}
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            {`${task.owners[0].firstName} ${task.owners[0].lastName}`}
                                                                            {task?.owners[1] && `, ${task?.owners[1]?.firstName} ${task?.owners[1]?.lastName}`}
                                                                        </>
                                                                    )

                                                                }
                                                        </small> */}
                                                    </div>
                                                    <small><strong>Team: </strong>
                                                        {
                                                            task.owners.length >= 3 ? (
                                                                <>
                                                                    {`${task.owners[0].firstName} ${task.owners[0].lastName}`}
                                                                    {`, ${task.owners[1].firstName} ${task.owners[1].lastName}...`}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {`${task.owners[0].firstName} ${task.owners[0].lastName}`}
                                                                    {task?.owners[1] && `, ${task?.owners[1]?.firstName} ${task?.owners[1]?.lastName}`}
                                                                </>
                                                            )

                                                        }
                                                    </small>
                                                    <div>
                                                        <small><strong>Status: </strong>  <span className="" >{task?.status}</span></small>
                                                    </div>
                                                    <div>
                                                        <small>
                                                            <strong>Due Date: </strong> <span className="" >{task?.timeToComplete} Days</span>
                                                        </small>
                                                    </div>
                                                    <div>
                                                        {/* <small><strong>Due Date: </strong>{task?.timeToComplete} Days</small> */}
                                                    </div>
                                                </Link>


                                                // <li key={task._id} className="list-group-item p-0">
                                                //     <div className="d-flex align-items-center">
                                                //         <div className="w-50 border-end my-2 px-2">
                                                //             <span
                                                //                 onClick={() => { navigate(`/dashboard/taskDetails/${task?._id}`) }}
                                                //                 style={{ cursor: "pointer" }} className="" >
                                                //                 {task.name}
                                                //             </span>
                                                //         </div>
                                                //         <div className="d-flex text-center px-1 w-50">
                                                //             <div className="border-end " style={{ width: "7rem" }}>{task?.status}</div>
                                                //             <div className="border-end" style={{ width: "7rem" }}>{task?.timeToComplete} Days</div>
                                                //             <div className="mx-auto">
                                                //                 {
                                                //                     task.owners.length >= 3 ? (
                                                //                         <>
                                                //                             {`${task.owners[0].firstName} ${task.owners[0].lastName}`}
                                                //                             {`, ${task.owners[1].firstName} ${task.owners[1].lastName}...`}
                                                //                         </>
                                                //                     ) : (
                                                //                         <>
                                                //                             {`${task.owners[0].firstName} ${task.owners[0].lastName}`}
                                                //                             {task?.owners[1] && `, ${task?.owners[1]?.firstName} ${task?.owners[1]?.lastName}`}
                                                //                         </>
                                                //                     )

                                                //                 }
                                                //             </div>
                                                //         </div>
                                                //     </div>
                                                // </li>
                                            )))
                                            :
                                            (
                                                renderTasks.length == 0 && <div className="mt-5 text-center my-auto">
                                                    <span>

                                                        No Task Available
                                                    </span>

                                                </div>
                                            )
                                    }
                                </div>
                            </section>
                        </div>
                    )
            }

        </>
    )
}

export default Dashboard