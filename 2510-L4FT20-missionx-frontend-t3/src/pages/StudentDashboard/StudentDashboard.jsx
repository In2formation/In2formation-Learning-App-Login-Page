// // // import React from 'react'

// import { Outlet } from "react-router"
// import DashboardFooter from "../../common/DashboardFooter"
// import DashboardHeader from "../../common/DashboardHeader"
// import Sidebar from "../../common/Sidebar"

// function StudentDashboard() {
//   return (
//     <>
//     <DashboardHeader/>
//     <div  style={{display:"flex"}}>
//       <Sidebar/>
//       <Outlet/>
//     </div>
//     <DashboardFooter/>
//     </>
//   )
// }

// export default StudentDashboard

import { Outlet } from "react-router"
import DashboardFooter from "../../common/DashboardFooter"
import DashboardHeader from "../../common/StudentDashboardHeader"
import Sidebar from "../../common/StudentDashboardSidebar"
import styles from "./StudentDashboard.module.css"
import { SidebarProvider, useSidebar } from "../../common/SidebarContext"

function InnerLayout() {
  const { isCollapsed } = useSidebar();
  const sidebarWidth = isCollapsed ? 120 : 236;
  const widthCalc = `calc(100% - ${sidebarWidth}px)`;
  const marginLeft = `${sidebarWidth}px`;

  return (
    <div className={styles.contentWrapper} style={{ width: widthCalc, marginLeft }}>
      <div className={styles.content}> 
        <Outlet/>
      </div>
    </div>
  )
}

function StudentDashboard() {
  return (
    <div className={styles.pageWrapper}>
      <DashboardHeader/>
      <div className={styles.mainContainer}>
        <SidebarProvider>
          <Sidebar />
          <InnerLayout />
        </SidebarProvider>
      </div>
      <DashboardFooter/>
    </div>
  )
}

export default StudentDashboard