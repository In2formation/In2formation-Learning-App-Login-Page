import { Outlet } from "react-router"
import DashboardFooter from "../../common/DashboardFooter"
import DashboardHeader from "../../common/TeacherDashboardHeader"
//Amy has updated Header from DashboardHeader to TeacherDashboardHeader 15 Jan
import TeacherDashboardSidebar from "../../common/TeacherDashboardSidebar"
import styles from "./TeacherDashboard.module.css"
import { SidebarProvider, useSidebar } from "../../common/SidebarContext"

function InnerLayout() {
  const { isCollapsed } = useSidebar();
  const sidebarWidth = isCollapsed ? 120 : 236;
  const widthCalc = `calc(100% - ${sidebarWidth}px)`;
  const marginLeft = `${sidebarWidth - 86}px`;

  return (
    <div className={styles.container}>
     
      <div className={styles.contentWrapper} style={{ width: widthCalc, marginLeft }}>
        <div className={styles.content}> 
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

function TeacherDashboard() {
  return (
    <>
      <DashboardHeader/>
      <SidebarProvider>
        <TeacherDashboardSidebar />
         <InnerLayout />
      </SidebarProvider>
      <DashboardFooter/>
    </>
  )
}

export default TeacherDashboard
