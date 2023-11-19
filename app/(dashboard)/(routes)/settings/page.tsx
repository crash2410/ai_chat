"use client"

import {Settings, Zap} from "lucide-react";
import Heading from "@/components/heading";
import {Button} from "@/components/ui/button";
import {useProModal} from "@/hooks/use-pro-modal";



const SettingsPage = () => {
    const proModal = useProModal();

    return (
        <div>
            <Heading
                title="Settings"
                description="Manage account settings."
                icon={Settings}
                iconColor="text-gray-700"
                bgColor="bg-gray-700/10"
            />
            <div className="px-4 lg:px-8 space-y-4">
                <div className="text-muted-foreground text-sm">
                    You are currently on a free plan.
                </div>
                <Button
                    variant="premium"
                    className="w-[250px] lg:w-[300px]"
                    onClick={proModal.onOpen}
                >
                    Update your plan
                    <Zap className="w-4 h-4 ml-2 fill-white"/>
                </Button>
            </div>
        </div>
    );
}

export default SettingsPage;