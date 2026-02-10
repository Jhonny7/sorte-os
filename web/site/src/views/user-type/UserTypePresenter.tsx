import { environment } from "@/environment/environment.prod";
import { httpService } from "@/services/HttpAppService";
import { LoadingService } from "common-lib";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function useUserTypePresenter() {

    const [data, setData] = useState<any[]>([]);
    const { t } = useTranslation();
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 9999,//En esta pantalla necesito todas las categorias
        total: 0,
        totalPages: 0,
        orderBy: "id",
        orderDir: "asc"
    });

    useEffect(() => {
        loadData();
    }, [pagination.page, pagination.limit, pagination.orderBy, pagination.orderDir]);

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
                    id_catalog_type: "2",
                    enable: true
                },
                fields: "id,url,name,description"
            });

            const items = response?.data?.items ?? [];

            const paginationResp = response?.data?.pagination ?? {};

            setData(items);
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


    return {
        data,
        t
    }
}