import React from 'react';

function Filters({ setFilter }) {
    return (
        <div className="flex flex-wrap gap-4 mb-6">
            <input type="date" className="p-2 border rounded dark:bg-gray-700" onChange={(e) => setFilter(prev => ({ ...prev, date: e.target.value }))} />
            <select className="p-2 border rounded dark:bg-gray-700" onChange={(e) => setFilter(prev => ({ ...prev, campaign: e.target.value }))}>
                <option value="">All Campaigns</option>
                <option value="campaign1">Campaign A</option>
                <option value="campaign2">Campaign B</option>
            </select>
            <select className="p-2 border rounded dark:bg-gray-700" onChange={(e) => setFilter(prev => ({ ...prev, user: e.target.value }))}>
                <option value="">All Users</option>
                <option value="user1">User X</option>
                <option value="user2">User Y</option>
            </select>
        </div>
    );
}

export default Filters;