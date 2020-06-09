export const ISOtoCountry = async (country: any) => {
    const url = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;
    const res = await fetch(url);
    return (await res.json());
}