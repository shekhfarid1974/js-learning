import React from 'react';

function DataTable() {
    const topAgents = [
        { name: "John Doe", sales: "$2500" },
        { name: "Jane Smith", sales: "$2200" },
        { name: "Bob Johnson", sales: "$1900" }
    ];

    return (
        <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Top Performing Agents</h2>
            <table className="w-full table-auto">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700">
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Sales</th>
                    </tr>
                </thead>
                <tbody>
                    {topAgents.map((agent, i) => (
                        <tr key={i} className="border-t dark:border-gray-600">
                            <td className="p-2">{agent.name}</td>
                            <td className="p-2">{agent.sales}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;