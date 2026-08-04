import { Link, Outlet } from "react-router-dom"


const Sidebar = () => {
  return (
    <>
    <div className="wrapper">
        <div className="sidebar">
            <Link to='' className="nav_link" >Dashboard</Link>
            <Link to='transactions' className="nav_link">Transactions</Link>
            <Link to='addTransaction' className="nav_link">AddTransaction</Link>
            <Link to='reports' className="nav_link">Reports</Link>
            <Link to='profile' className="nav_link"> Profile</Link>
        </div>
        <div className="top_bar">
            <div className="head"> 
                <h3>Welcome</h3>
            </div>
            <div className="icons">

            </div>
        </div>
        <div className="main">
            <Outlet />
        </div>
    </div>
    </>
  )
}

export default Sidebar