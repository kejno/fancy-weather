export const covid = async () => {
    try {
        const url = `https://api.covid19api.com/country/Belarus?from=2020-05-30T00:00:00Z&to=2020-05-31T00:00:00Z`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error(error)
    }
}