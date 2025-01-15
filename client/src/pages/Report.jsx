import { useEffect, useState } from "react"
import Header from "../components/common/Header"
import { useSelector } from "react-redux"
import ChartView from "../components/common/ChartView"


function Report() {

    const { teams, user, tasks, projects } = useSelector(state => state.user)


    const [field, setField] = useState({ category: "projects" })
    // list of selected catetegory (project or team...)
    const [list, setList] = useState([])
    // 
    const [selectedDropDown, setSelectedDropDown] = useState()
    const [stat, setStat] = useState({
        "To Do": 0,
        "In Progress": 0,
        "Completed": 0,
        "Blocked": 0
    })

    const projectsField = "projects";
    const teamField = "teams";
    // console.log(selectedDropDown);

    useEffect(() => {
        // console.log(selectedDropDown);
        if (field.category == projectsField) {
            const projectList = projects.reduce((acc, curr) => acc = [...acc, curr.name], [])
            setList(projectList)
        } else {
            const teamList = teams.reduce((acc, curr) => acc = [...acc, curr.name], [])
            setList(teamList)
        }

        const statusList = ["To Do", "In Progress", "Completed", "Blocked"]

        setStat({
            "To Do": 0,
            "In Progress": 0,
            "Completed": 0,
            "Blocked": 0
        })


        if (field.category === projectsField) {
            tasks.forEach(task => {
                if (task.project.name === selectedDropDown) {
                    setStat(prev => ({
                        ...prev,
                        [task.status]: prev[task.status] + 1
                    }))
                }
            })
        }else {
            tasks.forEach(task => {
                if (task.team.name === selectedDropDown) {
                    setStat(prev => ({
                        ...prev,
                        [task.status]: prev[task.status] + 1
                    }))
                }
            })

        }

        // statusList.map((status) => {
        //     const count = tasks.filter(task => task.status == status)
        //     // console.log("count", count);

        //     const data = { [status]: count.length }
        //     // setStat(prev => prev.push( {[status]: count.length} ))
        //     setStat(prev => [...prev, data])
        // })


    }, [field, selectedDropDown])

    // useEffect(() => {
    //     console.log(list);

    //     setSelectedDropDown(list[0])

    // }, [])

    function handlerFieldOnChange(e) {
        const { value } = e.target

        setField({ category: value })
    }

    function handlerDropDownOnChange(e) {
        const { value } = e.target.value
    }

    // console.log(stat);



    return (
        <>
            <main className="container  vh-100">
                <section className="">
                    <div className="d-flex justify-content-center gap-3">
                        <div className="mt-5 w-100 ">

                            <div className="form-floating ">
                                <select
                                    className="form-select"
                                    id="floatingSelect"
                                    name="category"
                                    aria-label="Floating label select example"
                                    onChange={(e) => handlerFieldOnChange(e)}
                                >
                                    {/* {
                                        list?.map(list => (
                                            <option
                                                value={list}
                                            >
                                                Projects
                                            </option>
                                        ))
                                    } */}

                                    <option value="projects">Projects</option>
                                    <option value="teams">Teams</option>

                                </select>
                                <label htmlFor="floatingSelect">Selected field</label>
                            </div>

                            <div className="form-floating mt-3">
                                <select
                                    className="form-select"
                                    id="floatingSelect"
                                    aria-label="Floating label select example"
                                    onChange={(e) => setSelectedDropDown(e.target.value)}
                                >
                                    <option>Select</option>

                                    {
                                        list.map(list => (
                                            <option
                                                key={list}
                                                value={list}
                                            >
                                                {list}
                                            </option>
                                        ))
                                    }

                                </select>
                                <label htmlFor="floatingSelect">
                                    {field.category === projectsField ? "Selected project" : "Selected team"}
                                </label>
                            </div>


                        </div>
                        <div className="mt-5 w-100 ">
                            <div className=" mx-auto" style={{ width: "25rem" }}>
                                <ChartView stat={stat} />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )

}

export default Report