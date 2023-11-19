/**
 * Компонент LandingPage отображает главную страницу.
 *
 * @param children - дочерние элементы компонента.
 * @returns JSX-элемент главной страницы.
 */
const LandingPage = ({children}: { children: React.ReactNode }) => {
    return (
        <main className="h-full bg-[#111827] overflow-auto">
            <div className="mx-auto max-w-screen-xl h-full w-full">
                {children}
            </div>
        </main>
    )
}

export default LandingPage;