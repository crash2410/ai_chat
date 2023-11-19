import {LandingNavbar} from "@/components/landing-navbar";
import {LandingHero} from "@/components/landing-hero";
import {LandingContent} from "@/components/landing-content";

/**
 * Компонент LandingPage отображает главную страницу.
 *
 * @returns JSX-элемент главной страницы.
 */
const LandingPage = () => {
    return (
        <div className="h-full ">
            {/* Верхняя навигационная панель */}
            <LandingNavbar/>

            {/* Заголовок */}
            <LandingHero/>

            {/* Блок с отзывами */}
            <LandingContent/>
        </div>
    )
}

export default LandingPage;