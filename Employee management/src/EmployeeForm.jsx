import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeeForm() {
  const [name, Setname] = useState("");
  const [email, Setemail] = useState("");
  const [position, Setposition] = useState("");
  const [phone, Setphone] = useState("");
  const [salary, Setsalary] = useState("");
  const navigate = useNavigate();

  const HandleSubmit = (e) =>{
    e.preventDefault();
    const newEmployee = {
        name,
        email,
        position,
        phone,
        salary,
      };
      const employees = JSON.parse(localStorage.getItem("employees")) || [];
      employees.push(newEmployee);

      localStorage.setItem("employees", JSON.stringify(employees));
      Setname("");
      Setemail("");
      Setposition("");
      Setphone("");
      Setsalary("");
    console.log(name,email,position,phone,salary);
    navigate("/employees");
  }
  return(
    <>
    <br />
    <form onSubmit={HandleSubmit}>
        <div>
        <label>Name : </label>
        <input type="text" value={name} required onChange={(e)=>Setname(e.target.value)}/>
        <br /><br />
        <label>Email : </label>
        <input type="email" value={email} required onChange={(e)=>Setemail(e.target.value)}/>
        <br /><br />
        <label>Position : </label>
        <input type="text" value={position} required onChange={(e)=>Setposition(e.target.value)}/>
        <br /><br />
        <label>Phone-Number : </label>
        <input type="tel" value={phone} required onChange={(e)=>Setphone(e.target.value)}/>
        <br /><br />
        <label>Salary : </label>
        <input type="text" value={salary} required onChange={(e)=>Setsalary(e.target.value)}/>
        <br /><br />
        <button type="submit">Submit</button>
        </div>
    </form>
  </>
  )
   
}
