"use client";
import { Chip } from "@/components/atoms/Chip/Chip";
import RestaurantCard from "@/components/molecules/restaurant-card/RestaurantCard";
import { environment } from "@/environment/environment.prod";
import { httpService } from "@/services/HttpAppService";
import { LoadingService, useTheme } from "common-lib";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function useHomePresenter() {
    const { theme }: any = useTheme();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isSticky, setIsSticky] = useState(false);
    const [opens, setOpens] = useState(false);

    const [data, setData] = useState<any[]>([]);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 9999,//En esta pantalla necesito todas las categorias
        total: 0,
        totalPages: 0,
        orderBy: "id",
        orderDir: "asc"
    });

    useEffect(() => {
        const scrollEl = scrollContainerRef.current;
        if (!scrollEl) return;

        const onScroll = () => {
            setIsSticky(scrollEl.scrollTop > 80);
        };

        scrollEl.addEventListener('scroll', onScroll);
        return () => scrollEl.removeEventListener('scroll', onScroll);
    }, []);

    const categories = [
        {
            title: "home.food",
            icon: "/categories/comida.png"
        },
        {
            title: "home.snack",
            icon: "/categories/snacks.png"
        },
        {
            title: "home.bread",
            icon: "/categories/cafe.png"
        },
        {
            title: "home.exp",
            icon: "/categories/expendio.png"
        },
        {
            title: "home.stores",
            icon: "/categories/tienda.png"
        },
        {
            title: "home.transport",
            icon: "/categories/transporte.png"
        },
    ];

    const restaurantes = [{
        img: "https://picsum.photos/200/300?random=1",
        title: "Marushas (Av. Tamaulipas)",
        hasCombos: true,
        minPrice: 99
    },
    {
        img: "https://picsum.photos/200/300?random=2",
        title: "Marushas (Av. Tamaulipas)",
        hasCombos: true,
        minPrice: 99
    },
    {
        img: "https://picsum.photos/200/300?random=3",
        title: "Marushas (Av. Tamaulipas)",
        hasCombos: true,
        minPrice: 99
    },]

    const dishes = [{
        img: "https://picsum.photos/200/300?random=1",
        title: "Burrito de queso",
        offerPrice: 80,
        price: 99
    },
    {
        img: "https://picsum.photos/200/300?random=2",
        title: "Hot dog Bacon Cheese",
        offerPrice: 80,
        price: 99
    },
    {
        img: "https://picsum.photos/200/300?random=3",
        title: "Hotdog street",
        price: 99
    },]

    const chips = [
        {
            name: t('home.filters.news'),
            tag: "updated",
            order: "asc"
        },
        {
            name: t('home.filters.price'),
            tag: "updated",
            order: "asc"
        },
        {
            name: t('home.filters.hashtag'),
            tag: "updated",
            order: "asc"
        },
        {
            name: t('home.filters.quantity'),
            tag: "updated",
            order: "asc"
        },
    ];

    const locals = [
        {
            img: "https://picsum.photos/200/300?random=1",
            title: "Burrito de queso",
            time: 67,
            kms: 6.5,
            component: <RestaurantCard
                img={"https://picsum.photos/200/300?random=2"}
                hasCombos={false}
                minPrice={70}
                title={<div className="chips">
                    <Chip text="#consumeLocal" />
                    <Chip text="#delicioso" />
                </div>} />
        }
    ]

    useEffect(() => {
        loadData();
        let search: any = document.getElementsByClassName("search-content");
        if (search && search[0]?.children[1]?.children?.length > 1) {
            search[0].children[1].children[0].remove();
        }
    }, [pagination.page, pagination.limit, pagination.orderBy, pagination.orderDir]);

    function getRandomItems<T>(arr: T[], count: number): T[] {
        if (!Array.isArray(arr)) return [];
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    async function loadData() {
        LoadingService.show();
        try {
            const response: any = await httpService.post(environment.getCatalogsByPagination, {
                page: pagination.page,
                limit: pagination.limit,
                order_by: pagination.orderBy,
                order_dir: pagination.orderDir,
                filter_logic: "or",
                filters: {},
                fixed_filters: {
                    id_catalog_type: "3"
                },
                fields: "id,url,name,description"
            });

            const items = response?.data?.items ?? [];

            const randomItems = getRandomItems(items, 6);

            const paginationResp = response?.data?.pagination ?? {};

            setData(randomItems);
            setPagination(prev => ({
                ...prev,
                total: paginationResp.total ?? prev.total,
                totalPages: paginationResp.pages ?? prev.totalPages,
                page: paginationResp.page ?? prev.page,
                limit: paginationResp.limit ?? prev.limit
            }));
        } catch (error) {
            console.error("Error cargando modulos contables", error);
        } finally {
            LoadingService.hide();
        }
    }

    async function openLocations() {
        setOpens(true)
    }

    return {
        navigate,
        t,
        theme,
        categories: data,
        restaurantes,
        dishes,
        isSticky,
        scrollContainerRef,
        chips,
        locals,
        openLocations,
        opens, setOpens
    };
}