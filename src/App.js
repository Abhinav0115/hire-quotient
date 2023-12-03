import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import AdminPanel from "./components/AdminPanel";
import { Modal } from "./components/Modal";

function App() {
    const [modalOpen, setModalOpen] = useState(false);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        role: "member",
    });

    //columns for the table
    const columns = [
        {
            Header: "Name",
            accessor: "name",
        },
        {
            Header: "Email",
            accessor: "email",
        },
        {
            Header: "Role",
            accessor: "role",
        },
    ];

    //admin panel

    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data from the mock API endpoint
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
                ); // Mock API endpoint
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []); // Fetch data on component mount

    const handleEdit = (row) => {
        // Implement edit logic
        setRowToEdit(row);
        setModalOpen(true);
        const user = data.filter((item) => item.id === row);
        setFormState({
            name: user[0].name,
            email: user[0].email,
            role: user[0].role,
        });
    };

    const handleSubmit = () => {
        // Implement submit logic
        console.log("formState", formState);
        const newData = data.map((item) => {
            if (item.id === rowToEdit) {
                return {
                    ...item,
                    name: formState.name,
                    email: formState.email,
                    role: formState.role,
                };
            }
            return item;
        });
        setData(newData);
        setModalOpen(false);
    };

    return (
        <div className="">
            <AdminPanel
                data={data}
                setData={setData}
                columns={columns}
                handleEdit={handleEdit}
            />
            {modalOpen && (
                <Modal
                    formState={formState}
                    setFormState={setFormState}
                    closeModal={() => {
                        setModalOpen(false);
                    }}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
}

export default App;
