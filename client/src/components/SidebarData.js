import React from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: "Home",
        path: "/home",
        icon: <AiIcons.AiFillHome />,
        cName: "nav-text"
    },
    {
        title: "Countries",
        path: "/countries",
        icon: <IoIcons.IoMdGlobe />,
        cName: "nav-text"
    },
    {
        title: "Cities",
        path: "/cities",
        icon: <FaIcons.FaCartPlus />,
        cName: "nav-text"
    },
    {
        title: "Contacts",
        path: "/contacts",
        icon: <IoIcons.IoMdContacts />,
        cName: "nav-text"
    },
    {
        title: "Agencies",
        path: "/agencies",
        icon: <IoIcons.IoMdDocument />,
        cName: "nav-text"
    },
    {
        title: "Professions",
        path: "/professions",
        icon: <IoIcons.IoMdCompass />,
        cName: "nav-text"
    }
];
