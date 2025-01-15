import { useNavigate } from "react-router-dom";
import Footer from "../components/common/Footer"
import Header from "../components/common/Header"
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Tooltip } from 'react-tooltip'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProject, addNewTag, addNewTask, addNewTeam } from "../features/userSlice";
import toast from "react-hot-toast";
import Multiselect from 'multiselect-react-dropdown';

const statusobj = ["To Do", "In Progress", "Completed", "Blocked"]
const successStatus = 'success'
function AddTask() {
    // name, project, team, owners, tags = undefined, timeToComplete, status
    const { status, error, projects, teams, owners, tags } = useSelector(state => state.user)

    const [taskDetails, setTaskDetails] = useState({
        taskName: "",
        project: "",
        team: "",
        owners: [],
        tags: [],
        dueDate: "",
        status: "",
    })

    const [formDetails, setFormDetails] = useState({
        project: "",
        description: "",
        team: "",
        tag: ""
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (status === successStatus) {
            navigate('/dashboard')
        }
    },[status])

    // track changes to add new project, team , tag using btn
    function onChangeHandler(e) {
        const { name, value } = e.target
        setFormDetails(prev => ({
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

    function onSubmitNewProjectHandler() {

        if (!formDetails.project) {
            toast.error("Project Name Required")
            return
        }

        const data = { project: formDetails.project, description: formDetails.description }
        dispatch(addNewProject(data))
        formDetails({
            project: "",
            description: ""
        })
    }

    function onSubmitNewTeamHandler(e) {

        if (!formDetails.team) {
            toast.error("Team Name Required")
            return
        }
        dispatch(addNewTeam(formDetails))
        setFormDetails({
            project: "",
            description: "",
            team: ""
        })
    }

    function onSubmitNewTagHandler(e) {

        if (!formDetails.tag) {
            toast.error("Tag Name Required")
            return
        }
        dispatch(addNewTag(formDetails))
        setFormDetails({
            project: "",
            description: "",
            team: "",
            tag: ""
        })
    }

    // track changes to add new task 
    function onChangeNewTaskHandler(e) {
        const { name, value, } = e.target
        // console.log("name", name);
        // console.log("value", value);

        setTaskDetails(prev => ({
            ...prev,
            [name]: value
        }))

        // if (type === "checkbox") {

        //     setTaskDetails(prev => ({
        //         ...prev,
        //         [name]: checked ? [...prev[name], value] : prev[name].filter(data => data !== value)
        //     }))

        // } else {
        //     setTaskDetails(prev => ({
        //         ...prev,
        //         [name]: value
        //     }))
        // }
    }

    function addNewTaskHander() {
        // console.log(taskDetails);

        const { taskName, project, team, owners, tags, dueDate, status } = taskDetails

        if (!taskName || !project || !team || !owners.length || !tags.length || !dueDate || !status) {
            toast.error("All Feilds Required")
            return
        }
        dispatch(addNewTask(taskDetails))
        setTaskDetails(prev => ({
            taskName: "",
            project: "",
            team: "",
            owners: [],
            tags: [],
            timeToComplete: "",
            status: "",
        }))



    }

    return (
        <>
            <main>
                <section className="mt-4 min-vh-100">
                    <div className="container border">
                        <div className="d-flex ">
                            <div
                                onClick={() => navigate("/dashboard")}
                                role="button" className="d-flex align-items-center gap-1">
                                <span className="btn btn-sm bg-info">
                                    <FaArrowLeftLong /> Back
                                </span>

                            </div>
                            <h3 className="mt-2 mx-auto">Add Task</h3>
                        </div>
                    </div>

                    <div className="container mt-3 mb-5 p-2 border-opacity-50 shadow-sm border border-warning rounded " >
                        <div>
                            {/* Task Name & project */}
                            <div className="row g-2 mt-2">
                                <div className="col-md">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="floatingInputGrid"
                                            placeholder=""
                                            value={taskDetails.taskName}
                                            name="taskName"
                                            onChange={(e) => onChangeNewTaskHandler(e)}
                                        />
                                        <label htmlFor="floatingInputGrid" className="text-secondary">Enter Task Details</label>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div >
                                        {
                                            // project
                                            projects?.length > 0 ?
                                                (
                                                    <div className="form-floating d-flex gap-2">
                                                        <select
                                                            className="form-select"
                                                            id="floatingSelectGrid"
                                                            name="project"
                                                            onChange={(e) => onChangeNewTaskHandler(e)}

                                                        >
                                                            <option value={""}>{taskDetails.project.length > 0 ? taskDetails.project : '--'}</option>
                                                            {
                                                                projects.map((project) => (
                                                                    <option
                                                                        key={project?._id}
                                                                        value={project?._id}
                                                                        name="project"

                                                                    >
                                                                        {project.name}
                                                                    </option>
                                                                ))
                                                            }
                                                            {/* <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option> */}
                                                        </select>
                                                        <label htmlFor="floatingSelectGrid">Select Project</label>

                                                        <div className=" my-auto">
                                                            <button type="button"
                                                                data-tooltip-id="tooltip-addProject"
                                                                data-tooltip-content="Add New Project"
                                                                className="btn btn-warning rounded"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                                data-bs-whatever="@mdo"
                                                            >
                                                                <IoMdAddCircleOutline />
                                                            </button>
                                                            <Tooltip id="tooltip-addProject" />
                                                        </div>
                                                    </div>
                                                ) :
                                                (
                                                    <div className="text-center text-secondary">
                                                        <div className="">
                                                            No Project. Add To See  -&gt;
                                                        </div>
                                                        <div className="my-auto">
                                                            <button type="button"
                                                                data-tooltip-id="tooltip-addProject"
                                                                data-tooltip-content="Add New Project"
                                                                className="btn btn-warning rounded"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                                data-bs-whatever="@mdo"
                                                            >
                                                                <IoMdAddCircleOutline />
                                                            </button>
                                                            <Tooltip id="tooltip-addProject" />
                                                        </div>
                                                    </div>
                                                )
                                        }

                                    </div>
                                </div>
                            </div>

                            {/* Team & status  */}
                            <div className="row g-2 mt-2">
                                {/* status */}
                                <div className="col-md ">
                                    <div >
                                        {
                                            (
                                                <div className="form-floating d-flex gap-2 ">
                                                    <select
                                                        className="form-select"
                                                        id="floatingSelectGrid"
                                                        name="status"
                                                        onChange={onChangeNewTaskHandler}
                                                    >
                                                        <option
                                                            name={"status"}
                                                            value={""}
                                                        >
                                                            --
                                                        </option>
                                                        {
                                                            statusobj.map((status, index) => (
                                                                <option
                                                                    key={status}
                                                                    value={status}
                                                                    name="status"
                                                                >
                                                                    {status}
                                                                </option>
                                                            ))
                                                        }

                                                    </select>
                                                    <label htmlFor="floatingSelectGrid">Select Status</label>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>

                                {/* team */}
                                <div className="col-md ">
                                    <div >
                                        {
                                            teams.length > 0 ?
                                                (
                                                    <div className="form-floating d-flex gap-2 ">
                                                        <select
                                                            className="form-select"
                                                            id="floatingSelectGrid"
                                                            name="team"
                                                            onChange={onChangeNewTaskHandler}
                                                        >
                                                            <option name={"team"} value={""} >--</option>
                                                            {
                                                                teams.map((team) => (
                                                                    <option
                                                                        key={team?._id}
                                                                        value={team?._id}
                                                                        name="team"
                                                                    >
                                                                        {team.name}
                                                                    </option>
                                                                ))
                                                            }

                                                        </select>
                                                        <label htmlFor="floatingSelectGrid">Select Team</label>

                                                        <div className="my-auto">
                                                            <button type="button"
                                                                data-tooltip-id="tooltip-addTeam"
                                                                data-tooltip-content="Add New Team"
                                                                className="btn btn-warning rounded"
                                                                data-bs-toggle="modal"
                                                                // data-bs-target="#exampleModal"
                                                                data-bs-target="#addTeamModal"
                                                                data-bs-whatever="@mdo"
                                                            >
                                                                <IoMdAddCircleOutline />
                                                            </button>
                                                            <Tooltip id="tooltip-addTeam" />
                                                        </div>
                                                    </div>
                                                ) :
                                                (
                                                    <div className="text-center text-secondary">
                                                        <div className="mx-auto d-flex gap-2 justify-content-center align-items-center">
                                                            No Team. Add To See  -&gt;

                                                            <div className=" my-auto">
                                                                <button
                                                                    type="button"
                                                                    data-tooltip-id="tooltip-addTeam"
                                                                    data-tooltip-content="Add New Team"
                                                                    className="btn btn-warning rounded"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#addTeamModal"
                                                                    data-bs-whatever="@mdo"
                                                                >
                                                                    <IoMdAddCircleOutline />
                                                                </button>
                                                                <Tooltip id="tooltip-addTeam" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                        }

                                    </div>
                                </div>

                            </div>

                            {/* Owner & Tags */}
                            <div className="row g-2 mt-2">
                                {/* Owner */}
                                <div className="col-md mt-2">
                                    <div className="form-select">
                                        <Multiselect
                                            options={owners}
                                            displayValue="firstName"
                                            onSelect={handlerForMultiSelectOwner} // Function will trigger on select event
                                            onRemove={handlerForMultiSelectOwner} // Function will trigger on remove event
                                            placeholder="Select one or more owners "
                                            disablePreSelectedValues={status === 'success' ? true : false}
                                            hidePlaceholder={taskDetails.tags.length > 0 ? true : false}
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

                                {/* tags */}
                                <div className="col-md" >
                                    {
                                        tags.length > 0 ?
                                            (
                                                <div className="d-flex gap-2">
                                                    <div className="form-select">
                                                        <Multiselect
                                                            options={tags}
                                                            // selectedValues={teams}
                                                            displayValue="name"
                                                            onSelect={handlerForMultiSelectTag} // Function will trigger on select event
                                                            onRemove={handlerForMultiSelectTag} // Function will trigger on remove event
                                                            placeholder="Select one or more Tags"
                                                            hidePlaceholder={taskDetails.tags.length > 0 ? true : false}
                                                            name={"tag"}
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
                                                    <div className=" my-auto">
                                                        <button
                                                            type="button"
                                                            data-tooltip-id="tooltip-addTag"
                                                            data-tooltip-content="Add New Tag"
                                                            className="btn btn-warning rounded"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#addTagModal"
                                                            data-bs-whatever="@mdo"
                                                        >
                                                            <IoMdAddCircleOutline />
                                                        </button>
                                                        <Tooltip id="tooltip-addTag" />
                                                    </div>
                                                </div>
                                            )
                                            :
                                            (
                                                <div className="text-center text-secondary form-control">
                                                    <div className="mx-auto d-flex gap-2 justify-content-center align-items-center">
                                                        No Tags. Add To See  -&gt;

                                                        <div className=" my-auto">
                                                            <button
                                                                type="button"
                                                                data-tooltip-id="tooltip-addTag"
                                                                data-tooltip-content="Add New Tag"
                                                                className="btn btn-warning rounded"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#addTagModal"
                                                                data-bs-whatever="@mdo"
                                                            >
                                                                <IoMdAddCircleOutline />
                                                            </button>
                                                            <Tooltip id="tooltip-addTag" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                    }
                                </div>

                                {/* Due Date */}
                                <div className="row g-2 mt-2">
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="floatingInputGrid"
                                                placeholder="name@example.com"
                                                name="dueDate"
                                                value={taskDetails.dueDate}
                                                onChange={(e) => onChangeNewTaskHandler(e)}
                                            />
                                            <label
                                                className="text-secondary z-1"
                                                htmlFor="floatingInputGrid">
                                                Deadlin To Complete Task
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-md my-4 d-flex justify-content-md-end justify-content-center">
                                        <p
                                            onClick={addNewTaskHander}
                                            className="btn btn-success m-0"
                                            disabled={status == "loading" ? true : false}
                                        >
                                            Add New Task
                                        </p>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </section>

                {/* Modals */}

                {/* Add new Projects */}
                <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Project</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="recipient-name" className="col-form-label">Project name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="recipient-name"
                                            name="project"
                                            value={formDetails.project}
                                            disabled={status == "loading" ? true : false}
                                            onChange={onChangeHandler}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message-text" className="col-form-label">Description</label>
                                        <textarea
                                            name="description"
                                            value={formDetails.description}
                                            className="form-control"
                                            onChange={onChangeHandler}
                                            disabled={status == "loading" ? true : false}
                                            id="message-text"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    disabled={status == "loading" ? true : false}
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={onSubmitNewProjectHandler}
                                    disabled={status == "loading" ? true : false}
                                    type="button"
                                    className="btn btn-primary">
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add new Team */}
                <div className="modal fade" id="addTeamModal" aria-labelledby="exampleModalLabel" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Team</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="recipient-name" className="col-form-label">Team name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="recipient-name"
                                            name="team"
                                            value={formDetails.team}
                                            disabled={status == "loading" ? true : false}
                                            onChange={onChangeHandler}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message-text" className="col-form-label">Description</label>
                                        <textarea
                                            name="description"
                                            value={formDetails.description}
                                            className="form-control"
                                            onChange={onChangeHandler}
                                            disabled={status == "loading" ? true : false}
                                            id="message-text"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    disabled={status == "loading" ? true : false}
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={onSubmitNewTeamHandler}
                                    disabled={status == "loading" ? true : false}
                                    type="button"
                                    className="btn btn-primary">
                                    Add Team
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Add new Team */}
                <div className="modal fade" id="addTagModal" aria-labelledby="exampleModalLabel" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Team</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="recipient-name" className="col-form-label">Tag name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="recipient-name"
                                            name="tag"
                                            value={formDetails.tag}
                                            disabled={status == "loading" ? true : false}
                                            onChange={onChangeHandler}
                                        />
                                    </div>
                                    {/* <div className="mb-3">
                                        <label htmlFor="message-text" className="col-form-label">Description</label>
                                        <textarea
                                            name="description"
                                            value={formDetails.description}
                                            className="form-control"
                                            onChange={onChangeHandler}
                                            disabled={status == "loading" ? true : false}
                                            id="message-text"></textarea>
                                    </div> */}
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    disabled={status == "loading" ? true : false}
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={onSubmitNewTagHandler}
                                    disabled={status == "loading" ? true : false}
                                    type="button"
                                    className="btn btn-primary">
                                    Add Tag
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )

}

export default AddTask