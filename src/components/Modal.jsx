import React, { useState } from "react";
import "./Modal.css";

export const Modal = ({
    closeModal,
    onSubmit,
    defaultValue,
    formState,
    setFormState,
}) => {
    const [errors, setErrors] = useState("");

    const validateForm = () => {
        if (formState.name && formState.email && formState.role) {
            setErrors("");
            return true;
        } else {
            let errorFields = [];
            for (const [key, value] of Object.entries(formState)) {
                if (!value) {
                    errorFields.push(key);
                }
            }
            setErrors(errorFields.join(", "));
            return false;
        }
    };

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        onSubmit(formState);
        closeModal();
    };

    return (
        <div
            className="modal-container"
            onClick={(e) => {
                if (e.target.className === "modal-container") closeModal();
            }}
        >
            <div className="modal rounded-lg pt-7 pb-5 px-6 bg-gray-300 ">
                <form>
                    <div className="form-group">
                        <label htmlFor="page">Name</label>
                        <input
                            name="name"
                            onChange={handleChange}
                            value={formState.name}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Email</label>
                        <input
                            name="email"
                            onChange={handleChange}
                            value={formState.email}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <select
                            name="role"
                            onChange={handleChange}
                            value={formState.role}
                        >
                            <option value="member">member</option>
                            <option value="admin">Admin</option>
                            {/* <option value="error">Error</option> */}
                        </select>
                    </div>
                    {errors && (
                        <div className="error">{`Please include: ${errors}`}</div>
                    )}
                    <button
                        type="submit"
                        className="btn p-1 bg-green-600 rounded-md px-4 text-white m-auto block"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};
