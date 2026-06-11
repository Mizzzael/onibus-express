export default function convertDataStringToDbFormat(dataString: string): string {
    const date = new Date(dataString);
    const saoPauloDate = new Date(date.getTime());
    const year = saoPauloDate.getFullYear();
    const month = String(saoPauloDate.getMonth() + 1).padStart(2, '0');
    const day = String(saoPauloDate.getDate()).padStart(2, '0');
    const hours = String(saoPauloDate.getHours()).padStart(2, '0');
    const minutes = String(saoPauloDate.getMinutes()).padStart(2, '0');
    const seconds = String(saoPauloDate.getSeconds()).padStart(2, '0');
    const formatted = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return formatted;
}