import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";

export function useFetchAllCommitsOfRepo<TData = unknown>(url: string | null, token?: string) {
    return useQuery<TData>({
        queryKey: ["all-commits", url],
        queryFn: async () => {
            const response = await api.get(url as string, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            return response.data;
        },
        enabled: !!token && !!url,
        staleTime: 1000 * 60 * 10, // 10 minutes
    });
}
