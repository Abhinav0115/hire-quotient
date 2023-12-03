// AdminPanel.js
import React, { useState } from "react";
import classNames from "classnames";
import { Pencil, Trash2 } from "lucide-react";

const AdminPanel = ({ data, setData, columns, handleEdit }) => {
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [pageIndex, setPageIndex] = useState(0);
    const [checked, setChecked] = useState(false);

    const itemSelected = Object.keys(selectedRowIds).length;
    const total = data.length;
    const totalPages = Math.ceil(data.length / 10);
    const screenWidth = window.screen.width;

    const handleDelete = (row) => {
        // Implement delete logic
        const updatedData = data.filter((item) => item.id !== row);
        setData(updatedData);
        console.log("Delete row:", row);
    };

    // console.log(
    //     "Selected row ids:",
    //     selectedRowIds.forEach((id) => setTotal())
    // );

    const handleDeleteSelected = () => {
        // Implement delete selected logic

        const updatedData = data.filter((item) => !selectedRowIds[item.id]);
        setData(updatedData);
        setSelectedRowIds({});
        const selectedRows = Object.keys(selectedRowIds).map(
            (id) => data[Number(id)]
        );
        console.log("Delete selected rows:", selectedRows);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setPageIndex(0);
    };

    const handleSelectAll = () => {
        // Implement select all logic
        const selected = {};

        const firstItem = pageIndex * 10;
        const lastItem = pageIndex * 10 + 10;
        const visibleData = data.slice(firstItem, lastItem);
        visibleData.forEach((row) => {
            selected[row.id] = true;
        });
        if (checked) {
            setSelectedRowIds({});
            setChecked(false);
        } else {
            setSelectedRowIds(selected);
            setChecked(true);
        }
    };

    const getVisibleData = () => {
        // Apply search/filtering and pagination logic
        const filteredData = data.filter((row) =>
            Object.values(row).some((value) =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

        const start = pageIndex * 10;
        const end = start + 10;
        const visibleData = filteredData.slice(start, end);

        return visibleData;
    };

    const visibleData = getVisibleData();

    return (
        <div className="container mx-auto p-4 mr-4">
            {screenWidth > 700 ? (
                <div className="flex justify-between">
                    <div className="mb-4 flex flex-row w-2/3">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="p-2 border border-gray-300 rounded-md w-2/3 lg:w-2/4"
                        />
                        <button
                            className="ml-2 p-2 px-4 bg-blue-500 text-white rounded-md"
                            onClick={() => setPageIndex(0)}
                        >
                            Search
                        </button>
                    </div>
                    <div className="">
                        <button
                            onClick={handleDeleteSelected}
                            className="p-2 w-full bg-red-500 text-white rounded-md "
                        >
                            Delete Selected
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mb-4 flex flex-row w-full">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="p-2 border border-gray-300 rounded-md min-w-full ml-4"
                    />
                    <button
                        className="ml-2 p-2 px-4 bg-blue-500 text-white rounded-md"
                        onClick={() => setPageIndex(0)}
                    >
                        Search
                    </button>
                </div>
            )}

            <table className="w-full border-collapse border border-gray-600 text-center">
                <thead>
                    <tr>
                        <th className="border border-gray-300 bg-gray-200 px-3 lg:px-1">
                            <input
                                type="checkbox"
                                name="select-all"
                                onChange={handleSelectAll}
                                value={checked}
                                className=""
                            />
                        </th>
                        {columns.map((column) => (
                            <th
                                key={column.Header}
                                className="p-2 border border-gray-300 bg-gray-200 "
                            >
                                {column.Header}
                            </th>
                        ))}
                        <th className="border border-gray-300 bg-gray-200 w-[12%] mx-4 lg:mx-0">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {visibleData.map((row) => (
                        <tr
                            key={row.id}
                            className={classNames("border border-gray-300", {
                                "bg-gray-100": selectedRowIds[row.id],
                            })}
                        >
                            <td>
                                <input
                                    type="checkbox"
                                    className=" border border-gray-300"
                                    checked={selectedRowIds[row.id]}
                                    onChange={() => {
                                        setSelectedRowIds((prev) => {
                                            const updated = { ...prev };
                                            if (updated[row.id]) {
                                                delete updated[row.id];
                                            } else {
                                                updated[row.id] = true;
                                            }
                                            return updated;
                                        });
                                    }}
                                />
                            </td>

                            {columns.map((column) => (
                                <td
                                    key={column.Header}
                                    className="p-2 border border-gray-300 "
                                >
                                    {row[column.accessor]}
                                </td>
                            ))}
                            <td className="text-center justify-center mx-auto flex-1 lg:flex-none">
                                <div className="mx-2 lg:mx-0 mt-2">
                                    <button
                                        className=" edit mr-4 text-green-500 hover:text-green-700 hover:underline"
                                        onClick={() => handleEdit(row.id)}
                                    >
                                        {/* {screenWidth < 700 ? (
                                            <span className="">Edit</span>
                                        ) : (
                                            <Pencil className="lg:w-4/5" />
                                            )} */}
                                        <Pencil className="lg:w-4/5" />
                                    </button>
                                    <button
                                        className=" delete text-red-400 hover:underline hover:text-red-600"
                                        onClick={() => handleDelete(row.id)}
                                    >
                                        {/* {screenWidth < 700 ? (
                                            <span className="">Delete</span>
                                        ) : (
                                            <Trash2 className="lg:w-4/5" />
                                            )} */}
                                        <Trash2 className="lg:w-4/5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 flex justify-between items-center flex-col lg:flex-row ml-24 lg:ml-0">
                <div className="flex items-center">
                    <span className="mr-4 text-sm text-gray-400 mb-4 lg:mb-0">
                        {itemSelected} out of {total} Selected
                    </span>
                </div>

                <div className="flex flex-col lg:flex-row">
                    <div className="flex items-center justify-center text-sm">
                        <span className="mr-4 text-gray-400 mt-1 mb-4 lg:mb-0">
                            Page {pageIndex + 1} of {totalPages}
                        </span>
                    </div>
                    <div className=" flex gap-1 text-sm">
                        <button
                            onClick={() => setPageIndex(0)}
                            disabled={pageIndex === 0}
                            className=" p-1 px-3 bg-gray-500 text-white rounded-l-xl"
                        >
                            {"<<"}
                        </button>
                        <button
                            onClick={() => setPageIndex(pageIndex - 1)}
                            disabled={pageIndex === 0}
                            className=" p-1  px-3 bg-gray-500 text-white rounded-sm"
                        >
                            {"<"}
                        </button>
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setPageIndex(index)}
                                className={classNames(
                                    "p-1 px-3 border border-gray-300 rounded-full",
                                    {
                                        "bg-gray-500 text-white":
                                            pageIndex === index,
                                    }
                                )}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setPageIndex(pageIndex + 1)}
                            disabled={
                                pageIndex === totalPages - 1 || total === 0
                            }
                            className=" p-1  px-3 bg-gray-500 text-white  rounded-sm"
                        >
                            {" >"}
                        </button>
                        <button
                            onClick={() => setPageIndex(totalPages - 1)}
                            disabled={
                                pageIndex === totalPages - 1 || total === 0
                            }
                            className="p-1  px-3 bg-gray-500 text-white rounded-r-xl"
                        >
                            {" >>"}
                        </button>
                    </div>
                </div>
            </div>
            {screenWidth < 700 && (
                <div className="mt-4 ml-24 lg:ml-0 text-center">
                    <button
                        onClick={handleDeleteSelected}
                        className="p-2 bg-red-500 text-white rounded-md"
                    >
                        Delete Selected
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
