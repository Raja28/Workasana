import { Chart, ArcElement } from "chart.js/auto"
import { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2"
import { useSelector } from "react-redux"
Chart.register(ArcElement);


function ChartView({ stat }) {
    // const { teams, user, tasks, projects } = useSelector(state => state.user)
    const [statData, setStatData] = useState([])
    const statusList = ["To Do", "In Progress", "Completed", "Blocked"]

    useEffect(() => {
        let data = statusList.reduce((acc, curr) => acc = [...acc, stat[curr]], [])
        // console.log(data);
        setStatData(data)

    }, [stat])

    // console.log(stat);
    // console.log(statData);


    return (
        <div className="card " >
            <div className="card-body p-5" >
                <Doughnut
                    data={{
                        labels: ["To Do", "In Progress", "Completed", "Blocked"],
                        datasets: [
                            {
                                // label: "Statistic",
                                data: statData,
                                backgroundColor: ["red", "blue", "green", "yellow"]
                            },
                            // {
                            //     label: "In Progress",
                            //     data: ["400"]
                            // },
                            // {
                            //     label: "Completed",
                            //     data:["800"]
                            // },
                            // {
                            //     label: "Blocked",
                            //     data: ["200"]
                            // }
                        ]
                    }}
                />
            </div>

            {/* </Doughnut> */}
        </div>
    )
}

export default ChartView