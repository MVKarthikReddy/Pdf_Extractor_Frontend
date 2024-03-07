import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import "../styles/navbar.css";
import { useNavigate } from 'react-router-dom'
import ProfilePage from "./ProfilePage";



export default function Navbar() {

	const [menuOpen,setMenuOpen] = useState(false)
	const [open,setOpen] = useState(false)
    const navigate = useNavigate()

	const updateMenu = () => {
		setMenuOpen(!menuOpen)
	}

	return (
		<div className="navbar">
			<header className="nav-header">
				<div className="nav-logo">

					<h2>PDF Extractor</h2>

				</div>
				<div className="nav-profile-container">

					<CgProfile className="profile" onClick={() => {setOpen(!open)}}/>
						
				</div>
			</header>
            { open && <ProfilePage />}
			
		</div>
	);
}