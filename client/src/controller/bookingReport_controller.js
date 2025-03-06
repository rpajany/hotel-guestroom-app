import axios from 'axios';
import { BaseURL, formatDate, formatDateTime, CalculateDays, ConvertToServerDate } from '../utils/custom';

export const load_BookingReport = async () => {
    try {
        let { data } = await axios.get(BaseURL + "/booking/load");
        console.log(data)
        // setBookingData((t) => ({ ...t, ...data }));
        return data
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
