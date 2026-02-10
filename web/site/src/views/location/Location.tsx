import { FabButton } from "@/components/atoms/fab-button/FabButton";
import AddressCard from "@/components/molecules/address-card/AddressCard";
import { Content } from "common-lib";
import { Fragment } from "react/jsx-runtime";
import { useLocationPresenter } from "./LocationPresenter";
import "./location.scss";

export default function Location({ isFull = false }) {

    const { navigate } = useLocationPresenter();

    let Component: any = isFull ? Content : Fragment;

    return <Component><div className={isFull ? 'modal-scrollable-content modal-scrollable-contentfull' : 'modal-scrollable-content'}>
        <section className={isFull ? 'location locationfull' : 'location'}>
            <AddressCard street="Ocampo 508" city="Aldama" state="Tamaulipas" postalCode="90670" name="Juan López Sarrelangue" phoneNumber="(836) 110 2662" />
            <AddressCard street="Ocampo 508" city="Aldama" state="Tamaulipas" postalCode="90670" name="Juan López Sarrelangue" phoneNumber="(836) 110 2662" />
            <AddressCard street="Ocampo 508" city="Aldama" state="Tamaulipas" postalCode="90670" name="Juan López Sarrelangue" phoneNumber="(836) 110 2662" />
            <AddressCard street="Ocampo 508" city="Aldama" state="Tamaulipas" postalCode="90670" name="Juan López Sarrelangue" phoneNumber="(836) 110 2662" />
            <AddressCard street="Ocampo 508" city="Aldama" state="Tamaulipas" postalCode="90670" name="Juan López Sarrelangue" phoneNumber="(836) 110 2662" />
            <AddressCard street="Ocampo 508" city="Aldama" state="Tamaulipas" postalCode="90670" name="Juan López Sarrelangue" phoneNumber="(836) 110 2662" />
            <AddressCard street="Ocampo 508" city="Aldama" state="Tamaulipas" postalCode="90670" name="Juan López Sarrelangue" phoneNumber="(836) 110 2662" />
            <AddressCard street="Ocampo 508" city="Aldama" state="Tamaulipas" postalCode="90670" name="Juan López Sarrelangue" phoneNumber="(836) 110 2662" />
            <AddressCard street="Ocampo 508" city="Aldama" state="Tamaulipas" postalCode="90670" name="Juan López Sarrelangue" phoneNumber="(836) 110 2662" />

        </section>
        <FabButton icon={'add'} extraClass={isFull ? 'fabfull' : ''} action={() => {
            navigate('add');
        }} />
    </div>
    </Component >
}