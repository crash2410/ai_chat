import Image from 'next/image'
import {Button} from "@/components/ui/button";
import {UserButton} from "@clerk/nextjs";

const DashboardPage = () => {
    return (
       <div>
           <p>Dashboard page</p>
           <UserButton afterSignOutUrl="/"></UserButton>
       </div>

    )
}

export default DashboardPage;
