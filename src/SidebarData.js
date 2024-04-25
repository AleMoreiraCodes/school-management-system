import React from "react";
import { AiFillHome } from "react-icons/ai";
import { IoIosPaper } from "react-icons/io";
import { FaChalkboardTeacher } from "react-icons/fa"; // Ícone de professor
import { PiStudentBold } from "react-icons/pi";

const SidebarData = [
    {
        title: 'Inicio',
        path: "/",
        icon: <AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title: 'Estudantes',
        path: "/AlunosList",
        icon: <PiStudentBold />,
        cName: 'nav-text'       
    },
    {
        title: 'Professores',
        path: "/AlunosList",
        icon: <FaChalkboardTeacher />,
        cName: 'nav-text'       
    }
    
]

export default SidebarData;