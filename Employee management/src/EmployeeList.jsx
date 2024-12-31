import React from "react";
import { useState } from "react";
export default function EmployeeList() {
  const [employees, setEmployees] = useState(
    JSON.parse(localStorage.getItem("employees")) || []
  );

  const deleteEmployee = (index) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };
  const updateEmployee = (index) => {
    const updatedName = prompt("Enter new name:", employees[index].name);
    const updatedEmail = prompt("Enter new email:", employees[index].email);
    const updatedPosition = prompt(
      "Enter new position:",
      employees[index].position
    );
    const updatedPhone = prompt(
      "Enter new phone number:",
      employees[index].phone
    );
    const updatedSalary = prompt("Enter new salary:", employees[index].salary);

    if (
      updatedName &&
      updatedEmail &&
      updatedPosition &&
      updatedPhone &&
      updatedSalary
    ) {
      const updatedEmployees = [...employees];
      updatedEmployees[index] = {
        name: updatedName,
        email: updatedEmail,
        position: updatedPosition,
        phone: updatedPhone,
        salary: updatedSalary,
      };

      setEmployees(updatedEmployees);
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    }
  };
  return (
    <div>
      <h2>Employee List</h2>
      {employees.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Phone</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td>{employee.phone}</td>
                <td>{employee.salary}</td>
                <td className="Btns">
                  <button onClick={() => deleteEmployee(index)}>Delete</button>
                  <button onClick={() => updateEmployee(index)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
}
