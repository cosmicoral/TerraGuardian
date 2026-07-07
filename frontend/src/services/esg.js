export async function getCarbonIntensity(){
    const res = await fetch(
        "https://api.carbonintensity.org.uk/intensity"
    );
    const json = await res.json();
    const data = json.data[0];

    return {
        actual: data.intensity.actual,
        forecast: data.intensity.forcast,
        index: data.intensity.index,
    };
}