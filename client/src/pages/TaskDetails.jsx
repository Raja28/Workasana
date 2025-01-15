import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useEffect, useState } from "react";
import Multiselect from 'multiselect-react-dropdown';
import { FaArrowLeftLong } from "react-icons/fa6";
import { deleteTask, updateTask } from "../features/userSlice";
import useWindowDimensions from "../hooks/useWindowDimensions";

const statusobj = ["To Do", "In Progress", "Completed", "Blocked"]
const minWidthForList = 800
const statusSuccess = 'success'

function TaskDetails() {

    const { taskId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { width } = useWindowDimensions()

    const [edit, setEdit] = useState(false)

    const [taskDetails, setTaskDetails] = useState({
        name: "", owners: [], project: [], status: "", tags: [], team: [], dueDate: "", taskId
    })
    // console.log(taskDetails);


    const { tasks, projects: storeProject, owners: storeOwners, tags: storeTags, status: storeStatus,
        teams: storeTeams
    } = useSelector(state => state.user)


    const task = tasks.filter(task => task._id === taskId)
    useEffect(() => {

        if (task?.length === 0 && storeStatus === statusSuccess) {
            setTaskDetails({
                name: "",
                owners: [],
                project: [],
                status: "",
                tags: [],
                team: [],
                dueDate: "",
                taskId
            })
            if (width <= minWidthForList) {
                navigate('/')

            }
            return
        }

        let tagsIdArr = task[0]?.tags.reduce((acc, curr) => acc = [...acc, curr._id], [])
        let ownersIdArr = task[0]?.owners.reduce((acc, curr) => acc = [...acc, curr._id], [])

        setTaskDetails({
            name: task[0]?.name,
            owners: ownersIdArr,
            project: task[0]?.project.name,
            status: task[0]?.status,
            tags: tagsIdArr,
            team: task[0]?.team,
            dueDate: task[0]?.dueDate,
            taskId
        })
        // }
    }, [taskId, edit, storeStatus])


    function onChangeHandler(e) {
        const { value, name } = e.target

        setTaskDetails(prev => ({
            ...prev,
            [name]: value
        }))

    }

    function handlerForMultiSelectOwner(updatedArray) {
        const ownersId = updatedArray?.reduce((acc, curr) => acc = [...acc, curr?._id], [])

        setTaskDetails(prev => ({
            ...prev,
            owners: ownersId
        }))
    }


    function handlerForMultiSelectTag(updatedArray) {

        const tagIds = updatedArray?.reduce((acc, curr) => acc = [...acc, curr?._id], [])

        setTaskDetails(prev => ({
            ...prev,
            tags: tagIds
        }))


    }

    function updateHandler(e) {

        const { name, status, dueDate, team, project, owners, tags } = taskDetails

        const teamId = team._id
        const projectId = project._id

        const updateData = {
            taskId,
            tags,
            owners,
            team: teamId,
            project: projectId,
            name,
            status,
            dueDate
        }

        setEdit(prev => !prev)

        dispatch(updateTask(updateData))
        setTaskDetails({
            name: "",
            owners: [],
            project: '',
            status: '',
            tags: [],
            team: [],
            timeToComplete: ''
        })
    }

    function handlerDeleteTask(taskId) {
        dispatch(deleteTask(taskId))
    }


    return (
        <>

            <main className="mb-4">
                {storeStatus == "loading" && <div className="bg"></div>}
                {/* <div className="w-100 h-100 position-absolute bg-dark bg-opacity-25"> */}

                {/* </div> */}
                <section className=" container mt-3">
                    <div className="d-flex">
                        <div
                            onClick={() => navigate("/dashboard")}
                            role="button"
                            className="d-flex align-items-center gap-1  "
                        >
                            <span className="border p-1 btn btn-sm bg-info">
                                <FaArrowLeftLong /> Back
                            </span>
                        </div>
                        <h3 className="mt-2 mx-auto">Task Detail</h3>
                    </div>
                    <div className="d-flex  gap-3  flex-md-nowrap ">
                        {/* task list left part */}
                        {width > minWidthForList &&
                            <div className="w-100">
                                <div className="list-group">

                                    {
                                        tasks?.map(task => (
                                            <Link
                                                to={`/dashboard/taskDetails/${task._id}`}
                                                disabled={storeStatus == "loading" ? true : false}
                                                key={task._id}
                                                value={task._id}
                                                className={task._id === taskId ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
                                            >
                                                {task.name}
                                            </Link>
                                        ))
                                    }

                                </div>
                            </div>
                        }
                        {/* right */}
                        <div className="border rounded p-3 w-100">
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder=""
                                    disabled={edit ? false : true}
                                    value={taskDetails.name}
                                    name="name"
                                    onChange={(e) => onChangeHandler(e)}
                                />
                                <label htmlFor="floatingInput">Enter Task Details</label>
                            </div>
                            {/* project */}
                            <div className="row g-2">
                                <div className="col-md">
                                    <div className="form-floating">
                                        <select
                                            className="form-select"
                                            id="floatingSelectGridProject"
                                            // value={taskDetails?.project}
                                            disabled={edit ? false : true}
                                            onChange={onChangeHandler}
                                            name="project"
                                        >
                                            <option value={taskDetails?.project}>
                                                {taskDetails?.project ? taskDetails?.project : '---'}

                                            </option>
                                            {
                                                storeProject?.map(project => (
                                                    <option key={project._id} name="project" value={project._id}>{project.name}</option>
                                                ))
                                            }

                                        </select>
                                        <label htmlFor="floatingSelectGridProject">Selects Project</label>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-floating">
                                        <select
                                            className="form-select"
                                            id="floatingSelectGridStatus"
                                            disabled={edit ? false : true}
                                            onChange={onChangeHandler}
                                            // value={taskDetails?.status}
                                            name="status"
                                        >
                                            <option value={taskDetails?.status}>
                                                {taskDetails?.status ? taskDetails?.status : ''}
                                            </option>
                                            {
                                                statusobj.map(status => (
                                                    <option key={status} value={status}>{status}</option>
                                                ))
                                            }

                                        </select>
                                        <label htmlFor="floatingSelectGridStatus">Select Status</label>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="row g-2 mt-2">
                                <div className="col-md">
                                    <div className="form-floating">
                                        <select
                                            className="form-select"
                                            id="floatingSelectGridTeam"
                                            // disabled={edit ? false : true}
                                        >
                                            <option value={taskDetails.team.name}>{taskDetails.team.name}</option>
                                            {
                                                statusobj.map(status => (
                                                    <option key={status} value={status} >{status}</option>
                                                ))
                                            }

                                        </select>
                                        <label htmlFor="floatingSelectGridTeam">Select Team</label>
                                    </div>
                                </div>
                            </div> */}


                            {/* <div className="row g-2 mt-2"> */}
                            <div className="mt-3">
                                <div className="">
                                    {
                                        <Multiselect
                                            className="border rounded form-select"

                                            options={storeOwners}
                                            selectedValues={storeOwners?.filter((owner, idx) => {
                                                if (-1 !== taskDetails?.owners?.findIndex(data => data === owner._id)) {
                                                    return owner
                                                }
                                            }
                                            )}

                                            displayValue="firstName"
                                            onSelect={handlerForMultiSelectOwner} // Function will trigger on select event
                                            onRemove={handlerForMultiSelectOwner} // Function will trigger on remove event
                                            placeholder="Select one or more owners "
                                            disablePreSelectedValues={edit ? false : true}
                                            hidePlaceholder={taskDetails?.owners?.length > 0 ? true : false}

                                            style={{
                                                multiselectContainer: {
                                                    color: 'black',
                                                    background: 'white',
                                                },
                                                searchBox: {
                                                    border: 'none',
                                                    borderBottom: 'none',
                                                }
                                            }}
                                        />
                                    }
                                </div>
                            </div>
                            {/* tags */}
                            <div className="mt-3">
                                <div className="form-select">
                                    <Multiselect
                                        options={storeTags}
                                        // selectedValues={taskDetails.tags}
                                        selectedValues={storeTags?.filter(tag => {

                                            if (-1 !== taskDetails?.tags?.findIndex(tagId => tagId === tag._id)) {
                                                return tag
                                            }
                                        })}

                                        displayValue="name"
                                        onSelect={handlerForMultiSelectTag} // Function will trigger on select event
                                        onRemove={handlerForMultiSelectTag} // Function will trigger on remove event
                                        placeholder="Select one or more Tags "
                                        hidePlaceholder={taskDetails?.tags?.length > 0 ? true : false}

                                        disablePreSelectedValues={edit ? false : true}
                                        style={{
                                            multiselectContainer: {
                                                color: 'black',
                                                background: 'white',
                                            },
                                            searchBox: {
                                                border: 'none',
                                                borderBottom: 'none',
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            {/* </div> */}

                            <div className="row g-2 mt-2">
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input
                                            type="date"
                                            className="form-control overflow-hidden"
                                            id="floatingInputGrid"
                                            placeholder="name@example.com"
                                            name="dueDate"
                                            value={taskDetails?.dueDate ? taskDetails?.dueDate : ''}
                                            disabled={edit ? false : true}
                                            onChange={onChangeHandler}

                                        />
                                        <label
                                            className="text-secondary overflow-hidden z-1"
                                            htmlFor="floatingInputGrid ">
                                            Deadline to complete task
                                        </label>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            id="floatingTeam"
                                            name="team"
                                            disabled={edit ? false : true}
                                            onChange={onChangeHandler}
                                        >
                                            <option value={taskDetails?.team?.name ? taskDetails?.team?.name : ''}>
                                                {taskDetails?.team?.name ? taskDetails?.team?.name : ''}
                                            </option>
                                            {
                                                storeTeams?.map((team) => (
                                                    <option
                                                        key={team?._id}
                                                        value={team?._id}
                                                        name="team"
                                                    >
                                                        {team?.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        <label htmlFor="floatingTeam" className="z-1">Select Team</label>
                                    </div>
                                </div>
                            </div>

                            <div className=" ">
                                <div className="w-100">
                                    {
                                        !edit && <div className="mt-4 d-flex justify-content-between">

                                            <p
                                                onClick={() => handlerDeleteTask(taskId)}
                                                className="btn btn-danger my-auto">
                                                Delete
                                            </p>

                                            <p className="btn btn-primary my-auto"
                                                onClick={() => setEdit(prev => true)}
                                            >
                                                Update Task
                                            </p>

                                        </div>

                                    }
                                </div>
                                <div className=" ">

                                    {
                                        edit && <div className=" d-flex justify-content-end mt-4 gap-3">
                                            <p
                                                className="btn btn-success"
                                                disabled={storeStatus == "loading" ? true : false}
                                                onClick={() => updateHandler()}
                                            >
                                                Save
                                            </p>
                                            <p
                                                className="btn btn-danger"
                                                disabled={storeStatus == "loading" ? true : false}
                                                onClick={() => setEdit(prev => false)}
                                            >
                                                Cancel Edit
                                            </p>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </main >

        </>
    )

}

export default TaskDetails