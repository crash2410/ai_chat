import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import {getApiLimitCount} from "@/lib/api-limit";


/**
 * Функция DashboardLayout является компонентом, отображающим макет панели инструментов.
 * Она принимает дочерние элементы в качестве свойства children.
 * Внутри функции происходит асинхронный вызов функции getApiLimitCount для получения значения apiLimitCount.
 * Затем функция возвращает компонент с разметкой, содержащей боковую панель и основную область содержимого.
 *
 * @param children - дочерние элементы, которые будут отображаться в основной области содержимого
 * @returns компонент с макетом панели инструментов
 */
const DashboardLayout = async ({
                             children
                         }: {
    children: React.ReactNode
}) => {
    // Получение значения apiLimitCount
    const apiLimitCount = await getApiLimitCount();

    // Возвращение компонента с разметкой
    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
                <Sidebar apiLimitCount={apiLimitCount}/>
            </div>
            <main className="md:pl-72">
                <Navbar />
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;