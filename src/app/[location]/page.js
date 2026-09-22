import { serviceLocations } from "@/Data/data";
import CityPage from "./CityPage";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const { location } = await params;

    const decodedLocation = decodeURIComponent(location);

    const rawCity = decodedLocation.split("in-").pop();

    const cityName = rawCity
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

    return {
        title: `Bar Bending Machine Importer in ${cityName} | Rebar Bending Machine`,
        description: `Top Bar Bending Machine Importer in ${cityName} offering automatic & heavy-duty rebar bending machines for construction & infrastructure projects.`,
    };
}

const Page = async ({ params }) => {
    const { location } = await params;

    const decodedLocation = decodeURIComponent(location);

    console.log("URL location:", location);
    console.log("Decoded location:", decodedLocation);

    const validCity = serviceLocations.find(
        (c) => decodeURIComponent(c.href.replace("/", "")) === decodedLocation
    );
    console.log(validCity.label)

    if (!validCity) {
        notFound();
    }

    return <CityPage location={validCity.label} />;
};

export default Page;