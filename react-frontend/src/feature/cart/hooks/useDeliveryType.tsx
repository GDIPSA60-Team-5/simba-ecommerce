import { useEffect, useState, useCallback } from "react";
import DeliveryTypeApi from "../service/DeliveryTypeApi";
import { DeliveryType } from "../../../types/DeliveryType";

export function useDeliveryType() {
    const [deliveryTypes, setDeliveryTypes] = useState<DeliveryType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDeliveryType = useCallback(() => {
        setLoading(true);
        setError(null);

        DeliveryTypeApi.getDeliveryTypes()
            .then((response) => {
                setDeliveryTypes(response);
            })
            .catch((err) => {
                setError("Failed to fetch delivery types");
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchDeliveryType();
    }, [fetchDeliveryType]);

    return { deliveryTypes, loading, error, refreshDeliveryType: fetchDeliveryType };
}
