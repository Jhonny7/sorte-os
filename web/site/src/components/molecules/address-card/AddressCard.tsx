import { useTranslation } from "react-i18next";
import "./address-card.scss";
import { Icon } from "common-lib";
import { useState } from "react";
import { Popover } from "@mui/material";

export default function AddressCard({ street = "", postalCode = "", state = "", city = "", name = "", phoneNumber = "", onDelete = () => { }, onEdit = () => { } }) {
    const { t } = useTranslation();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClose = () => setAnchorEl(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(event.currentTarget);

    return <>
        <section className="address-card">
            <div className="all">
                <div>
                    <p className="street">{street}</p>
                    <p className="data-location">{t("location.postal-code")} {postalCode} - {state} - {city}</p>
                    <p className="name">{name} - {phoneNumber}</p>
                </div>

                <div className="additional">
                    <p>{t("location.add")}</p>
                    <Icon name="chevron_right" />
                </div>

                <div className="more" onClick={handleClick}>
                    <Icon name="more_vert" />
                </div>
            </div>
        </section>

        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <section className="actionsss">
                <div className="actionss">
                    <div
                        onClick={() => {
                            handleClose();
                            onDelete?.();
                        }}
                    >
                        <Icon name="border_color" type="symbols" />
                        <p>{t("common.edit")}</p>
                    </div>
                </div>

                <div className="actionss">
                    <div
                        onClick={() => {
                            handleClose();
                            onEdit?.();
                        }}
                    >
                        <Icon name="delete" type="symbols" />
                        <p>{t("common.delete")}</p>
                    </div>
                </div>
            </section>

        </Popover>
    </>
}