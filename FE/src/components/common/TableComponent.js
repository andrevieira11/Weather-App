import React from 'react';

function TableComponent(props) {
    const { location, timeData, tempData, humidityData, rainData } = props
    return (
        <div>
            <table className="border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Location</th>
                        <th className="border px-4 py-2">Time</th>
                        <th className="border px-4 py-2">Temperature</th>
                        <th className="border px-4 py-2">Humidity</th>
                        <th className="border px-4 py-2">Rain</th>
                    </tr>
                </thead>
                <tbody>
                    {timeData.map((time, index) =>
                    (
                        <tr key={index} className={index % 2 === 0 ? 'bg-cyan-100' : ""}>
                            <td className="border px-4 py-2">{location}</td>
                            <td className="border px-4 py-2">{time.replace("T", " ").replace(":00.000Z", "")}</td>
                            <td className="border px-4 py-2">{tempData[index]}</td>
                            <td className="border px-4 py-2">{humidityData[index]}</td>
                            <td className="border px-4 py-2">{rainData[index]}</td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TableComponent;
