import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { setFilterData } from "../../../features/userSlice"
import useWindowDimensions from "../../../hooks/useWindowDimensions"

// { setFilter, filter }
function Sidebar() {
    const { height, width } = useWindowDimensions();
    const { tasks, users: usersList, projects: projectList, teams: teamList, tags: tagList } = useSelector(state => state.user)
    const [searchParams, setSearchParams] = useSearchParams()
    const [renderTasks, setRenderTask] = useState(tasks)
    const [filter, setFilter] = useState({
        projects: [],
        status: [],
        teams: [],
        tags: [],
        dateOrder: ''
    })

    const dispatch = useDispatch()
    const { taskId } = useParams()
    // console.log(filter);

    useEffect(() => {

        if (searchParams.get("projects")) {
            // console.log(searchParams.get("projects").split(","))
            setFilter(prev => ({
                ...prev,
                "projects": searchParams.get("projects").split(",").length > 1 ? searchParams.get("projects").split(",") : [searchParams.get("projects")]
            }))

            // searchParams.set("projects", searchParams.get("projects"))
            // setSearchParams(searchParams)
        }

        if (searchParams.get("status")) {
            const status = searchParams.get("status")?.split(",")
            setFilter(prev => ({
                ...prev,
                // "status": searchParams.get("status").split(",").length > 1 ? searchParams.get("status").split(",") : [searchParams.get("status")]
                "status": status
            }))
            // searchParams.set("status", searchParams.get("status"))
        }

        if (searchParams.get("teams")) {
            const teams = searchParams.get("teams")?.split(",")
            // console.log(teams);

            setFilter(prev => ({
                ...prev,
                // "teams": searchParams.get("teams").split(",").length > 1 ? searchParams.get("teams").split(",") : searchParams.get("teams")
                "teams": teams
            }))
            // searchParams.set("teams", searchParams.get("teams"))
        }

        if (searchParams.get("dateOrder")) {
            const dateOrder = searchParams.get("dateOrder")
            // console.log(teams);

            setFilter(prev => ({
                ...prev,
                "dateOrder": dateOrder
            }))
            // searchParams.set("teams", searchParams.get("teams"))
        }
        setSearchParams(searchParams)

    }, [])


    useEffect(() => {

        let data = []
        // sort based on projects
        if (filter.projects?.length > 0) {
            searchParams.set("projects", [...filter.projects])
            // setSearchParams(searchParams)

            tasks.forEach(task => {
                if (filter.projects?.includes(task.project.name)) {
                    data.push(task)
                }
            })
            // setRenderTask(prev => prev = data)
        }
        else {
            setSearchParams(searchParams.delete("projects"))
            // setRenderTask(prev => prev = tasks)
            data = tasks
        }

        // sort based on status
        if (filter.status?.length > 0) {
            searchParams.set("status", [...filter.status])
        } else {
            setSearchParams(searchParams.delete("status"))
        }

        // sort based on teams
        if (filter.teams?.length > 0) {
            searchParams.set("teams", [...filter.teams])
        } else {
            setSearchParams(searchParams.delete("teams"))
        }

        // sort based on tags
        if (filter.tags?.length > 0) {
            searchParams.set("tags", [...filter.tags])
        } else {
            setSearchParams(searchParams.delete("tags"))
        }



        if (filter.dateOrder) {
            searchParams.set('dateOrder', filter.dateOrder)
        } else {
            setSearchParams(searchParams.delete("dateOrder"))
        }

        setSearchParams(searchParams)

        const { projects, status, teams, tags, dateOrder } = filter

        if (projects.length || status.length || teams.length || tags.length || dateOrder) {

            // project sort
            if (projects.length) {
                data = tasks.filter(task => projects?.includes(task.project.name))
            } else {
                data = tasks
            }
            // status sort
            if (status.length) {
                data = data.filter(task => status?.includes(task.status))
            }
            // team sort
            if (teams.length) {
                data = data.filter(task => teams?.includes(task.team.name))
            }

            let temp = []
            if (tags.length) {
                // console.log("tags", tags);
                data.filter((task, index) => {
                    task.tags.map((tag) => {
                        // console.log("tag", tag);

                        if (tags.includes(tag.name)) {
                            temp.push(data[index])
                        }
                    })
                })
                data = temp  // console.log(temp);
                temp = []
            }

            const ascending = 'ascending'
            const descending = 'descending'
            // Object.defineProperty(data, {
            //     dueDate: {
            //         writable: true
            //     }

            // })

            if (dateOrder === ascending) {
                temp = [...data]
                temp.sort((task1, task2) => new Date(task1.dueDate) - new Date(task2.dueDate))
                data = temp

            } else {
                // temp = data.sort((task1, task2) => new Date(task2.dueDate) - new Date(task1.dueDate))
                temp = [...data]
                temp.sort((task1, task2) => new Date(task2.dueDate) - new Date(task1.dueDate))
                data = temp
                // console.log("dec", data);
            }
            // data = temp
            dispatch(setFilterData(data))
        } else {
            clearFilter()
            dispatch(setFilterData())
        }

    }, [filter])


    function clearFilter() {
        setRenderTask(tasks)
    }


    function onChangeHandler(e) {
        const { checked, name, value, type } = e.target

        if (type !== 'radio') {
            setFilter(prev => ({
                ...prev,
                [name]: checked ? [...prev[name], value] : prev[name]?.filter(data => data !== value)
            }))
        } else {
            setFilter(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    function handlerClearFilter() {
        const queryKeys = ["projects", "status", "teams", "tags"]

        queryKeys.forEach(query => {
            searchParams.delete(query)
        })


        setFilter({
            projects: [],
            status: [],
            teams: [],
            tags: [],
        })
    }

    // window.history.pushState({}, '', `?${"team=[hello, wello]"}`);

    // setSearchParams({
    //     "team": searchParams.get('team'),
    // })
    // console.log(searchParams.get('team'))


    return (
        <div className={width <= 825 ? "w-100" : ""} style={{ width: "250px" }}>

            <div className="px-1">
                <Link
                    to={"/dashboard/addTask"}
                    className="btn btn-warning w-100 fw-semibold">
                    Add Task
                </Link>
                <Link
                    to={"/dashboard/report/"}
                    className="btn btn-warning w-100 fw-semibold mt-3"
                >
                    Statistics
                </Link>
            </div>
            {
                !taskId &&
                <>
                    <div className="d-flex justify-content-between px-2 fw-semibold mt-3">
                        <p className="">Filters</p>
                        <p
                            className=""
                            type="button"
                            onClick={handlerClearFilter}
                        >
                            <u>Clear</u>
                        </p>
                    </div>


                    <div className="">

                        <div className="accordion" id="accordionExample">
                            {/* projects */}
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Projects
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        {
                                            projectList?.map(project => (
                                                <div key={project._id} className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="projects"
                                                        value={project.name}
                                                        id={project.name}
                                                        checked={filter.projects.includes(project.name)}
                                                        onChange={(e) => onChangeHandler(e)}

                                                    />
                                                    <label className="form-check-label" htmlFor={project.name} >
                                                        {project.name}
                                                    </label>
                                                </div>
                                            ))
                                        }
                                        {/* <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                    <label className="form-check-label" htmlFor="flexCheckChecked">
                                        WorkAsana
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="ModernMobiles" />
                                    <label className="form-check-label" htmlFor="ModernMobiles">
                                        Modern Mobiles
                                    </label>
                                </div> */}
                                    </div>
                                </div>
                            </div>
                            {/* Teams */}
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Teams
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">

                                        {
                                            teamList?.map(team => (
                                                <div key={team._id} className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value={team.name}
                                                        id={team.name}
                                                        name="teams"
                                                        checked={filter.teams.includes(team.name)}
                                                        onChange={(e) => onChangeHandler(e)}
                                                    />
                                                    <label className="form-check-label" htmlFor={team.name}>
                                                        {team.name}
                                                    </label>

                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed fw-semibold fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Status
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value="To Do"
                                                id="ToDo"
                                                name="status"
                                                checked={filter.status.includes("To Do")}
                                                onChange={(e) => onChangeHandler(e)}
                                            />
                                            <label className="form-check-label" htmlFor="ToDo">
                                                To Do
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value="In Progress"
                                                id="In Progress"
                                                name="status"
                                                checked={filter.status.includes("In Progress")}
                                                onChange={(e) => onChangeHandler(e)}
                                            />
                                            <label className="form-check-label" htmlFor="In Progress">
                                                In Progress
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value="Completed"
                                                id="Completed"
                                                name="status"
                                                checked={filter.status.includes("Completed")}
                                                onChange={(e) => onChangeHandler(e)}
                                            />
                                            <label className="form-check-label" htmlFor="Completed">
                                                Completed
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value="Blocked"
                                                id="Blocked"
                                                name="status"
                                                checked={filter.status.includes("Blocked")}
                                                onChange={(e) => onChangeHandler(e)}
                                            />
                                            <label className="form-check-label" htmlFor="Blocked">
                                                Blocked
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Owner */}
                            {/* <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                Owners
                            </button>
                        </h2>
                        <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="Vinod" id="Vinod" />
                                    <label className="form-check-label" htmlFor="Vinod">
                                        Vinod
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="Rahul" id="Rahul" />
                                    <label className="form-check-label" htmlFor="Rahul">
                                        Rahul
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="Arvind Kejriwal" id="Arvind Kejriwal" />
                                    <label className="form-check-label" htmlFor="Arvind Kejriwal">
                                        Arvind Kejriwal
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="Ajay" id="Ajay" />
                                    <label className="form-check-label" htmlFor="Ajay">
                                        Ajay
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="Sashi Tharor" id="Sashi Tharor" />
                                    <label className="form-check-label" htmlFor="Sashi Tharor">
                                        Sashi Tharor
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="Nitin Gadkari" id="Nitin Gadkari" />
                                    <label className="form-check-label" htmlFor="Nitin Gadkari">
                                        Nitin Gadkari
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="Sonai Gandhi" id="Sonai Gandhi" />
                                    <label className="form-check-label" htmlFor="Sonai Gandhi">
                                        Sonai Gandhi
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="Piyush Goyal" id="Piyush Goyal" />
                                    <label className="form-check-label" htmlFor="Piyush Goyal">
                                        Piyush Goyal
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="Amit Shah" id="Amit Shah" />
                                    <label className="form-check-label" htmlFor="Amit Shah">
                                        Amit Shah
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div> */}

                            {/* Date TODO if required */}
                            {/* <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDate" aria-expanded="false" aria-controls="collapseDate">
                                Date
                            </button>
                        </h2>
                        <div id="collapseDate" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                Date
                            </div>
                        </div>
                    </div> */}

                            {/* Tag */}
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTag" aria-expanded="false" aria-controls="collapseTag">
                                        Tags
                                    </button>
                                </h2>
                                <div id="collapseTag" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        {
                                            tagList?.map(tag => (
                                                <div key={tag._id} className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value={tag.name}
                                                        id={tag.name}
                                                        name="tags"
                                                        checked={filter.tags.includes(tag.name)}
                                                        onChange={(e) => onChangeHandler(e)}
                                                    />
                                                    <label className="form-check-label" htmlFor={tag.name}>
                                                        {tag.name}
                                                    </label>

                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            {/* Date */}
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseDate" aria-expanded="false" aria-controls="collapseDate">
                                        Date
                                    </button>
                                </h2>
                                <div id="collapseDate" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        {/* {
                                            tagList?.map(tag => (
                                                <div key={tag._id} className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value={tag.name}
                                                        id={tag.name}
                                                        name="tags"
                                                        checked={filter.tags.includes(tag.name)}
                                                        onChange={(e) => onChangeHandler(e)}
                                                    />
                                                    <label className="form-check-label" htmlFor={tag.name}>
                                                        {tag.name}
                                                    </label>

                                                </div>
                                            ))
                                        } */}
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" id="flexRadioDefault1"
                                                name="dateOrder"
                                                value={'descending'}
                                                onChange={(e) => onChangeHandler(e)}
                                            />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                New Tasks
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" id="flexRadioDefault2"
                                                name="dateOrder"
                                                value={'ascending'}
                                                onChange={(e) => onChangeHandler(e)}
                                            />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                Old Tasks
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </>
            }
            {/* <div className="px-1">
                <Link
                    to={"/dashboard/addTask"}
                    className="btn btn-warning w-100 fw-semibold">
                    Add Task
                </Link>
                <Link
                    to={"/dashboard/report/"}
                    className="btn btn-warning w-100 fw-semibold mt-3"
                >
                    Statistics
                </Link>
            </div> */}

        </div>
    )
}

export default Sidebar