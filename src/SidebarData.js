import React from "react";
import { AiFillHome } from "react-icons/ai";
import { IoIosPaper } from "react-icons/io";
import { FaChalkboardTeacher } from "react-icons/fa"; // Ícone de professor
import { PiStudentBold } from "react-icons/pi";
import { FaBook } from "react-icons/fa"; // Ícone de cursos
import { FaUsers } from "react-icons/fa"; // ícone de turmas

const SidebarData = [
    {
        title: 'Inicio',
        path: "/",
        icon: <AiFillHome />,
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
        path: "/ProfList",
        icon: <FaChalkboardTeacher />,
        cName: 'nav-text'
    },
    {
        title: 'Cursos',
        path: "/GerenciaCursos",
        icon: <FaBook />,
        cName: 'nav-text'
    },
    {
        title: 'Turmas',
        path: "/GerenciaTurmas",
        icon: <FaUsers  />,
        cName: 'nav-text'
    }
];

export default SidebarData;
